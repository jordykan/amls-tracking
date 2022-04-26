<template>
  <router-view />
</template>

<script>
  export default {
    name: 'App',
     created() {
      this.$store.dispatch("autoLogin")
    },
  }
</script>

<style lang="scss">
@import "./assets/css/app";
</style>
