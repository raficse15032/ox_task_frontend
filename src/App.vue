<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>
<style>
.animation{
      -webkit-animation: spinner .95s linear infinite;
      -o-animation: spinner .95s linear infinite;
      animation: spinner .95s linear infinite;
  }
  @keyframes spinner {
      from {
          -webkit-transform: rotate(0deg);
          -o-transform: rotate(0deg);
          transform: rotate(0deg);
      }
      to {
          -webkit-transform: rotate(360deg);
          -o-transform: rotate(360deg);
          transform: rotate(360deg);
      }
  }
  .pointer{
    cursor: pointer;
  }
</style>

