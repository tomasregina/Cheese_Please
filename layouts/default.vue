<template>
  <div>
    <TheHeader />
    <nuxt />
  </div>
</template>
<script>
import TheHeader from '@/components/TheHeader'
export default {
  components: {
    TheHeader
  }
}
</script>
<style>
body {
  margin: 0.5rem;
}

</style>
