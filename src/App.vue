<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted(){
    this.refreshToken();
  },
  methods:{
    refreshToken() {
      if(this.$auth.isAuthenticated()){
        var diff = this.$auth.getExpiration() - Date.now();
        if(diff<(1*60*1000)){
          this.$store.dispatch('REFRESH_TOKEN')
        }
      }
      setTimeout(this.refreshToken,45*1000);
    }
  },
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
  .red{
    color:red
  }
</style>

