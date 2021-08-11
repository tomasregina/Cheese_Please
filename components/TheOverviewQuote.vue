<template>
    <div>
        <div style="width: 18rem;">
            <img :src="quote.thumbnail" class="card-img-top" alt="...">
            <div class="card-body">
                <p class="card-text">{{ quote.text }}</p>
            </div>
            <!-- <button class="btn-primary" @click="deleteQuote(quote.id)">Delete</button> -->
        </div>
    </div>
    
</template>
<script>
import axios from 'axios';
export default {
    props: {
        quote: Object
    },
    methods: {
        deleteQuote(id) {
            const foundQuote = this.quotes.find((quote) => quote.id === id);
            this.$axios.$delete(process.env.baseUrl + '/data.json/1');
        }
    },
    computed: {
        quotes() {
            return this.$store.getters['data/getQuotes'];
        }
    }
}
</script>