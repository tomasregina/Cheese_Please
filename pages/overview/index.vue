<template>
    <div class="row">
        <TheOverviewQuote v-for="quote in quotesList" :key="quote.id" :quote="quote" />
    </div>
</template>
<script>
import axios from 'axios';
import TheOverviewQuote from '@/components/TheOverviewQuote.vue'
export default {
    data() {
        return {
            quotes: null,
        }
    },
    components: {
        TheOverviewQuote
    },
    async fetch() {
        this.quotes = await this.$axios.$get(process.env.baseUrl + '/data.json');
        let quotesArray = [];
        Object.keys(this.quotes).forEach((key) => {
            quotesArray.push(this.quotes[key]);
        });
        this.$store.dispatch('data/setQoutes', quotesArray);
    }, 
    computed: {
        quotesList() {
            return this.$store.getters['data/getQuotes']
        }
    }
}
</script>