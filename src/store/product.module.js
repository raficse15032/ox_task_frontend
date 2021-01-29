
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
            this.$axios.post("/api/product",data).then(response => {
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
            this.$axios.put("/api/product",data.data).then(response => {
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
    [DELETE_PRODUCT]({commit},id_index) {
        return new Promise((resolve, reject) => {
            this.$axios.delete("/api/product/"+id_index.id).then(response => {
                commit(AFTER_DELETE_PRODUCT,id_index.index);
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
        // iziToast.success({position:'topRight',title:'Ok',message:"PRODUCT Delated Successsfully"})
    },
    [AFTER_ADD_PRODUCT](state,data){
        state.products.data.unshift(data)
        // iziToast.success({position:'topRight',title:'Ok',message:"PRODUCT Added Successsfully"})
    },
    [AFTER_UPDATE_PRODUCT](state,payload){
        state.products.data.splice(payload.index,0,payload.update_data)
        state.products.data.splice(payload.index+1,1)
        // iziToast.success({position:'topRight',title:'Ok',message:"PRODUCT Updated Successsfully"})
    },
    
};

export default {
    state,
    actions,
    mutations,
    getters
};