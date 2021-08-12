<template>
  <div>
    <div class="btn-container">
      <button
        v-if="!gameStarted && !showResults"
        @click="startGame"
        :disabled="!allLoaded"
        type="button"
        class="btn btn-primary btn-lg"
      >
        I'm ready!
      </button>
      <button
        v-if="gameStarted && !showResults"
        @click="endGame"
        type="button"
        class="btn btn-warning"
      >
        Stop game
      </button>
    </div>
    <div v-if="showResults">
      <TheResultsModal />
    </div>

    <div class="video-container">
      <video ref="video" autoplay muted></video>
    </div>
    <div class="joke-window" v-if="!showResults">
      <div
        v-if="gameStarted && quotesText === null"
        class="spinner-border text-warning"
        role="status"
      >
        <span class="sr-only">Loading...</span>
      </div>
      <TheJokeWindow
        :quotes-text="quotesText"
        :quotes-thumbnail="quotesThumbnail"
        v-show="gameStarted && quotesText !== null"
      />
    </div>
    <div v-if="faceEmoji" class="face-emoji">
      <img
        class="face-emoji-img"
        img
        :src="require(`@/assets/${faceEmoji}.png`)"
        alt=""
      />
    </div>
    <div v-if="faceNotDetected" class="no-face-warning">
      <h5>Face not detected</h5>
    </div>
  </div>
</template>

<script>
import * as faceapi from "face-api.js";
import TheJokeWindow from "@/components/TheJokeWindow.vue";
import TheResultsModal from "@/components/TheResultsModal.vue";
import axios from "axios";

export default {
  components: {
    TheJokeWindow,
    TheResultsModal
  },
  computed: {
    score() {
      return this.$store.getters["score/getScore"];
    }
  },
  async fetch() {
    this.quotes = await this.$axios.$get(process.env.baseUrl + "/data.json");
    let quotesArray = [];
    Object.keys(this.quotes).forEach(key => {
      quotesArray.push(this.quotes[key]);
    });
    this.$store.dispatch("data/setQoutes", quotesArray);
    ß;
  },
  data() {
    return {
      gameStarted: false,
      quotesText: null,
      quotesThumbnail: null,
      myQuotes: [],
      quotes: null,
      recognitionInterval: null,
      nextJokeInterval: null,
      showResults: false,
      allLoaded: false,
      faceEmoji: undefined,
      faceNotDetected: false
    };
  },
  methods: {
    /*  getImgUrl(pic) {
            return require('../assets/'+pic+'.png')
        }, */
    shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    },
    randomeJokePicker() {
      const jokeListLength = this.myQuotes.length;
      const jokePosition = this.getRandomInt(0, jokeListLength - 1);
      this.myQuotes = this.shuffle(this.myQuotes);
      const quote = this.myQuotes.splice(jokePosition, 1)[0];
      this.quotesText = quote.text;
      this.quotesThumbnail = quote.thumbnail;
    },
    startGame() {
      console.log("startGame");
      this.$store.dispatch("score/resetScore");
      console.log("222");
      this.myQuotes = [...this.$store.getters["data/getQuotes"]];
      console.log("333");
      this.recognitionInterval = setInterval(
        () => this.recognizeExpression(),
        900
      );
      this.gameStarted = true;


      this.nextJokeInterval = setInterval(() => {
        this.randomeJokePicker();
        if (this.myQuotes.length === 0) {
          clearInterval(this.nextJokeInterval);
          setTimeout(() => {
            clearInterval(this.recognitionInterval);
            this.stopWebcam();
            this.showResults = true;
          }, 6000);
        }
      }, 6000);
    },
    endGame() {
      clearInterval(this.nextJokeInterval);
      clearInterval(this.recognitionInterval);
      this.gameStarted = !this.gameStarted;
    },
    startVideo() {
      const video = this.$refs.video;
      navigator.getUserMedia(
        { video: {} },
        stream => (video.srcObject = stream),
        err => console.log(err)
      );
    },
    async recognizeExpression() {
      this.faceNotDetected = false;
      const video = this.$refs.video;
      const detectionWithExpressions = await faceapi
        .detectSingleFace(video)
        .withFaceExpressions();
      if (!detectionWithExpressions) {
        this.faceNotDetected = true;
        return;
      }
      if (detectionWithExpressions.expressions.happy > 0.85) {
        this.$store.dispatch("score/updateScore");
        this.faceEmoji = "smile";
        return;
      }
      if (detectionWithExpressions.expressions.sad > 0.85) {
        this.faceEmoji = "sad";
        return;
      }
      if (detectionWithExpressions.expressions.angry > 0.85) {
        this.faceEmoji = "angry";
        return;
      }
      if (detectionWithExpressions.expressions.surprised > 0.85) {
        this.faceEmoji = "surprised";
        return;
      }
      this.faceEmoji = undefined;
    },
    stopWebcam() {
      const videoElem = this.$refs.video;
      const stream = videoElem.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(function(track) {
          track.stop();
        });
        videoElem.srcObject = null;
      }
    }
  },
  async mounted() {
    // test
    this.showResults = false;
    this.gameStarted = false;
    Promise.all([
      // for dev purpose, you can use terminal command "http-server -p 3001 --cors"
      // to serve face-api models locally
/*       await faceapi.nets.ssdMobilenetv1.loadFromUri("https://github.com/tomasregina/Cheese_Please/tree/master/assets/weights"),
      await faceapi.nets.tinyFaceDetector.loadFromUri("https://github.com/tomasregina/Cheese_Please/tree/master/assets/weights"),
      await faceapi.nets.faceExpressionNet.loadFromUri("https://github.com/tomasregina/Cheese_Please/tree/master/assets/weights")
 */   await faceapi.loadSsdMobilenetv1Model('/models'),
      await faceapi.loadTinyFaceDetectorModel('/models'),
      await faceapi.loadFaceExpressionModel('/models')
    ]).then(() => {
      this.startVideo();
      this.allLoaded = true;
    });
  },

  beforeDestroy() {
    this.stopWebcam();
  }
};
</script>

<style scoped>
video {
  width: 250;
  height: 150px;
}
.video-container {
  justify-content: center;
  display: flex;
  margin: 0;
  margin-top: 0.2rem;
}
.btn-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 0;
}
.btn-warning {
  margin-bottom: 0rem;
}
.joke-window {
  display: flex;
  justify-content: center;
  margin-top: 0.3rem;
}
.face-emoji {
  height: 50px;
  width: 50px;
  justify-content: center;
  display: flex;
  margin: auto;
}
.face-emoji-img {
  height: 50px;
  width: 50px;
}
.no-face-warning {
  justify-content: center;
  display: flex;
  margin: auto;
}
</style>
