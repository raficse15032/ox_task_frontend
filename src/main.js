// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
window.jQuery = require('jquery')

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import axios from 'axios'
import Auth from './packages/Auth'

Vue.use(VueSweetalert2)
Vue.use(Auth)
Vue.prototype.$axios = axios
Vue.config.productionTip = false

import router from './router'
import store from './store'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.headers.common["Authorization"] = 'Bearer '+ Vue.auth.getToken()

router.beforeEach(
  (to,from,next) => {
    if(to.matched.some(record => record.meta.forVisitors)){
      if(Vue.auth.isAuthenticated())
        next({
          path: '/account'
        })
      else
        next()
    }
      
    else if(to.matched.some(record => record.meta.forAuth)){
      if(!Vue.auth.isAuthenticated())
      next({
        path: '/login'
      })
      else
        next()
    }
      
    else
      next()  
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
