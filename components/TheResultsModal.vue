<template>
    <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">End of game</h1>
    <p class="lead">Your score is {{ score }} </p>
  </div>
</div>
</template>
<script>
export default {
    computed: {
      score() {
        return this.$store.getters['score/getScore'];
      }
    }
}
</script>