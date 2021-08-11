<template>
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row no-gutters">
            <div class="col-md-4">
                <img :src="quotesThumbnail" class="card-img" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <p class="card-text">{{ quotesText }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        quotesText: String,
        quotesThumbnail: String
    },
    mounted() {
    }
}
</script>