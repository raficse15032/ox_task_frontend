import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex);
import Product from "./product.module"
export default new Vuex.Store({
  modules: {
    Product
  }
})
