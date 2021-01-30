
import { ALL_PRODUCT,ADD_PRODUCT,UPDATE_PRODUCT,DELETE_PRODUCT} from "./action.type"
import { SET_PRODUCT,AFTER_ADD_PRODUCT,AFTER_UPDATE_PRODUCT,AFTER_DELETE_PRODUCT} from "./mutation.type"
import axios from 'axios'
const state = {
    products:{data:[]}
}

const getters = {
    products(state){
        return state.products
    }
}

const actions = {
    [ALL_PRODUCT](context,page) {
        return new Promise((resolve, reject) => {
            axios.get("/api/product?page="+page).then(response => {
                context.commit(SET_PRODUCT, response.data.products);
                resolve(response);
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },
    [ADD_PRODUCT]({commit},data) {
        return new Promise((resolve, reject) => {
            axios.post("/api/product",data).then(response => {
                commit(AFTER_ADD_PRODUCT,response.data);
                resolve(response);
            })
            .catch(function(error) {
                state.add_PRODUCT_loader = false

                reject(error);
            });
        });
    },
    [UPDATE_PRODUCT]({commit},data) {
        return new Promise((resolve, reject) => {
            axios.put("/api/product",data.data).then(response => {
                var update_data = response.data
                var index = data.index
                commit("AFTER_UPDATE_PRODUCT",{update_data,index});
                resolve(response);
            })
            .catch(function(error) {
                state.update_PRODUCT_loader = false
                reject(error);
            });
        });
    },
    [DELETE_PRODUCT]({commit},data) {
        return new Promise((resolve, reject) => {
            axios.delete("/api/product/"+data.id).then(response => {
                commit(AFTER_DELETE_PRODUCT,data.index);
                resolve(response);
            })
            .catch(function(error) {
                reject(error);
            });
        });
    },
}

const mutations = {
    [SET_PRODUCT](state, data){
        state.products = data
    },
    [AFTER_DELETE_PRODUCT](state,index){
        state.products.data.splice(index,1)
    },
    [AFTER_ADD_PRODUCT](state,data){
        state.products.data.unshift(data)
    },
    [AFTER_UPDATE_PRODUCT](state,payload){
        state.products.data.splice(payload.index,0,payload.update_data)
        state.products.data.splice(payload.index+1,1)
    },
    
};

export default {
    state,
    actions,
    mutations,
    getters
};