import axios from "axios"
import { REGISTER_USER, LOGIN_USER} from "./action.type"
import Vue from 'vue'
import Auth from '../packages/Auth'
import router from '../router'
Vue.use(Auth)
let auth = new Vue()
const state = {
    loginNotification:'',
    userinfo:{},
    authuser:{},
}

const getters = {
    authuser(state){
        return state.authuser
    },
    userinfo(state){
        return state.userinfo
    },
    loginNotification(state){
        return state.loginNotification
    }
}

const actions = {
    [REGISTER_USER]({commit},data) {
        return new Promise((resolve, reject) => {
            axios.post("api/registration",data)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            });
        });
    },
    [LOGIN_USER]({commit},data) {
        return new Promise((resolve, reject) => {
            axios.post("api/login",data)
            .then(response => {
                auth.$auth.setToken(response.data.access_token, (Date.now()+(response.data.expires_in*1000)))
                axios.defaults.headers.common["Authorization"] = 'Bearer '+ response.data.access_token
                resolve(response)
            })
            .catch(error => {
                reject(error)
            });
        });
    },
    // [AUTH_USER]({commit}) {
    //     return new Promise((resolve, reject) => {
    //         axios.get("api/user/info")
    //         .then(response => {
    //             commit(SET_AUTH_USER,response.data);
    //             resolve(response)
    //         })
    //         .catch(error => {
    //             reject(error)
    //         });
    //     });
    // },
    
}

const mutations = {
    // [SET_LOGIN_NOTIFIACTION](state,payload){
    //     state.loginNotification = payload
    // }, 
    // [SET_USER_INFO](state,data){
    //     state.userinfo = data;
    // },
    // [SET_AUTH_USER](state,data){
    //     state.authuser = data;
    // }

}
export default {
    state,
    actions,
    mutations,
    getters
};