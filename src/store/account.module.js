
import { ALL_ACCOUNT,ADD_ACCOUNT,UPDATE_ACCOUNT,DELETE_ACCOUNT} from "./action.type"
import { SET_ACCOUNT,AFTER_ADD_ACCOUNT,AFTER_UPDATE_ACCOUNT,AFTER_DELETE_ACCOUNT} from "./mutation.type"
import axios from 'axios'
const state = {
    accounts:{data:[]}
}

const getters = {
    accounts(state){
        return state.accounts
    }
}

const actions = {
    [ALL_ACCOUNT](context,page) {
        return new Promise((resolve, reject) => {
            axios.get("/api/account?page="+page).then(response => {
                context.commit(SET_ACCOUNT, response.data.accounts);
                resolve(response);
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },
    [ADD_ACCOUNT]({commit},data) {
        return new Promise((resolve, reject) => {
            axios.post("/api/account",data).then(response => {
                commit(AFTER_ADD_ACCOUNT,response.data);
                resolve(response);
            })
            .catch(function(error) {
                state.add_ACCOUNT_loader = false

                reject(error);
            });
        });
    },
    [UPDATE_ACCOUNT]({commit},data) {
        return new Promise((resolve, reject) => {
            axios.put("/api/account",data.data).then(response => {
                var update_data = response.data
                var index = data.index
                commit("AFTER_UPDATE_ACCOUNT",{update_data,index});
                resolve(response);
            })
            .catch(function(error) {
                state.update_ACCOUNT_loader = false
                reject(error);
            });
        });
    },
    [DELETE_ACCOUNT]({commit},data) {
        return new Promise((resolve, reject) => {
            axios.delete("/api/account/"+data.id).then(response => {
                commit(AFTER_DELETE_ACCOUNT,data.index);
                resolve(response);
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },
}

const mutations = {
    [SET_ACCOUNT](state, data){
        state.accounts = data
    },
    [AFTER_DELETE_ACCOUNT](state,index){
        state.accounts.data.splice(index,1)
    },
    [AFTER_ADD_ACCOUNT](state,data){
        state.accounts.data.unshift(data)
    },
    [AFTER_UPDATE_ACCOUNT](state,payload){
        state.accounts.data.splice(payload.index,0,payload.update_data)
        state.accounts.data.splice(payload.index+1,1)
    },
    
};

export default {
    state,
    actions,
    mutations,
    getters
};