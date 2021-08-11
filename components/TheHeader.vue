<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <nuxt-link class="navbar-brand" to="/">Try not to laugh!</nuxt-link>
        <!-- <button @click="toLandingPage" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button> -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <!-- <a class="nav-link" href="#">About <span class="sr-only">(current)</span></a> -->
                    <nuxt-link to="/about" class="nav-link">About</nuxt-link>
                </li>
                <li class="nav-item">
                    <!-- <a class="nav-link" href="#">Start Game</a> -->
                    <nuxt-link to="/game" class="nav-link">Game</nuxt-link>
                </li>
                <li class="nav-item">
                    <!-- <a class="nav-link" href="#">Start Game</a> -->
                    <nuxt-link to="/overview" class="nav-link">Overview</nuxt-link>
                </li>
            </ul>
            <ul class="navbar-nav mr-right">
                <li class="nav-item active">
                    <!-- <a class="nav-link" href="#">About <span class="sr-only">(current)</span></a> -->
                    <nuxt-link to="/newQuote" class="nav-link">Add new quote</nuxt-link>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script>
export default {
    methods: {
        toLandingPage() {
           this.$router.push('/')
        }
    }
}
</script>