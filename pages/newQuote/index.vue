<template>
    <!-- <form @submit.prevent="addQuote">
        <input type="text" placeholder="text" v-model="quotesText"><br>
        <input type="text" placeholder="link thumbnail" v-model="thumbnailLink"><br>
        <button type="submit" class="btn btn-primary">Add new quote</button>
    </form> -->

    <form @submit.prevent="addQuote">
        <div class="form-group">
            <label for="exampleInputEmail1">Quotes text</label>
            <input v-model="quotesText" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Thumbnail link</label>
            <input v-model="thumbnailLink" type="text" class="form-control" id="exampleInputPassword1">
        </div>

        <button type="submit" class="btn btn-primary">Add new quote</button>
</form>
</template>
<script>
import axios from 'axios';
import { uuid } from 'vue-uuid';
export default {
    data() {
        return {
            quotesText: null,
            thumbnailLink: null
        }
    },
    methods: {
        addQuote() {
            let newQuote = {
                id: uuid.v4(),
                text: this.quotesText,
                thumbnail: this.thumbnailLink
            }
            this.$axios.$post(process.env.baseUrl + '/data.json', newQuote );
        }
    }
}
</script>
<style scoped>
input {
    margin-bottom: 0.3rem;
}
.form-group {
    width: 30rem;
}
</style>