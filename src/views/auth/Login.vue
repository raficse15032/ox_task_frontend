<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="login()" class="btn btn-primary">Login</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      credential:{
          email:'admin@gmail.com',
          password:'admin123'
      }
    }
  },
  methods:{
      login(){
        return new Promise((resolve, reject) => {
            this.$axios.post("api/login",this.credential)
            .then(response => {
                this.$auth.setToken(response.data.access_token, (Date.now()+(response.data.expires_in*1000)))
                this.$axios.defaults.headers.common["Authorization"] = 'Bearer '+ response.data.access_token
                // router.push("/dashboard")
                resolve(response)
            })
            .catch(error => {
                reject(error)
            });
        });
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
