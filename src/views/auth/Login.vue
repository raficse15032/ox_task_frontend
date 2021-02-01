<template>
<div class="credential-bg">
    <div  class="overlay-shade">

    </div>
    <div class="row">
      <div class="left-side col-md-7"></div>
      <div class="right-side col-md-4">
        <div>
            <div class="text-center">
              <div  class="card ">
                <div style="height: 100vh;">
                  <div style="width:100%;color:#888" class="text-center logo pt-4 mt-2">
                      <img height="50px;" src="https://wedevs.com/img/logos/wedevs/wedevs-logo-colored.svg" alt="">
                      <h5>Assignment</h5>
                  </div>
                  <div style="width:100%" class="text-center heading">
                    <h3>Login</h3>
                  </div>
                  <form >
                    <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
                      <strong>{{error}}</strong>
                    </div>
                    <div class="form-group">
                      <input @keyup.enter="trigger()" @keyup="removeError()" v-model="credential.email" v-validate="'required'" type="email" name="Email" class="form-control" id="Email" placeholder="Email">
                      <span class="red">{{ errors.first('Email') }}</span>
                    </div>
                    <div class="form-group">
                      <input @keyup.enter="trigger()" @keyup="removeError()" v-model="credential.password" v-validate="'required'" type="password" name="Password" class="form-control" id="Password" placeholder="Password">
                      <span class="red">{{ errors.first('Password') }}</span>
                    </div>
                    <input  @click="loginNow()" ref="enter_press" type="hidden">
                    <button v-show="!loader" @click="loginNow()" type="button" class="btn btn-success">Login Now</button>
                    <button v-show="loader" type="button" class="btn btn-success"><i class="fas fa-cog animation"></i> Login...</button>
                    <div>
                        <div  class="col-md-12 text-center bottom-text">
                          <p>If you don't have a account <span @click="go()" style="text-decoration: underline;cursor:pointer;border-bottom:underline;">Register now</span></p>
                        </div>
                      </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="footer">
                <span>Developed By <span style="color:green">Abu Mohammad Rafi</span> </span>
            </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)
export default {
  name: 'Register',
  data(){
    return{
      check:false,
      loader:false,
      error:'',
      credential:{
        email:'',
        password:'',
      }
    }
  },
  methods:{
    loginNow(){
      this.$validator.validateAll().then( result =>{
          if(result){
            var data = this.credential
            this.loader = true
            this.$store.dispatch('LOGIN_USER',data).then(response=>{
              this.loader = false
              this.$router.push('/product') 
            })
            .catch(error=>{
              this.error = error.response.data.error
              this.serveErrors = error.response.data.errors
              this.loader=false
              this.check=false      
            });
          }  
      })
    },
    removeError(){
      this.error = ''
    },
    trigger () {
        this.$refs.enter_press.click()
    },
    go(){
      this.$router.push('/registration');
    }
  },
  
}
</script>

<style scoped>

  .credential-bg{
      position: fixed;
      content: "";
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background: url('../../static/image/bg2.jpg');
      background-size: cover;
      /* overflow: auto; */
  }
 
  .right-side{
    background-image: linear-gradient(to bottom, #ffffff, transparent);
    position: relative;
  }
  .overlay-shade{
    position: absolute;
    width: 100%;
    height: 50%;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(to top, black, transparent);
  }
  .card{
    background-color: transparent;
    border: 0px solid #fff;
  }
  .logo{
    margin-bottom: 1.7rem;
  }
  .heading{
    margin-bottom: 2rem;
    
  }
  .heading h3{
    color: #5a8f32;
    border-radius: 20px;
  }
 
  .btn-link{
    color:#cbf0ae;
    font-size:16px;
  }
  .btn-link:hover{
    color:#306607;
  }
  .bottom-text{
    margin-top: 15px;
    color:#2e3d22;
    font-size:16px;
  }
  .bottom-text span:hover{
    color:#3f8608;
  }
  .footer{
    width: 100%;
    text-align: center;
    /* background: rgb(255, 255, 255,0.3); */
    position: absolute;
    bottom: 0;
    left: 0;
    padding-top: 40px;
    padding-bottom: 10px;
    /* color: #fff; */
  
    background-image: linear-gradient(to top, #fff, transparent);
    font-size: 15px;
  }

  @media only screen and (max-width: 600px) {
    .credential-bg{
      overflow: auto;
      overflow-x: hidden;
    }
  }
</style>
