import axios from "axios"
import { REGISTER_USER, LOGIN_USER,LOGOUT_USER, REFRESH_TOKEN} from "./action.type"
import Vue from 'vue'
import Auth from '../packages/Auth'
Vue.use(Auth)
let auth = new Vue()

const state = {
    
}

const getters = {
    
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
    [LOGOUT_USER]({commit}) {
        return new Promise((resolve, reject) => {
            axios.post("api/logout")
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            });
        });
    },
    [REFRESH_TOKEN]({commit}) {
        return new Promise((resolve, reject) => {
            axios.post("api/refresh")
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
}

const mutations = {
    

}
export default {
    state,
    actions,
    mutations,
    getters
};