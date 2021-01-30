<template>
    <div>
        <div :class="modal?'open-modal':'close-modal'"  class="modal-shadow">
            <div  class="modal fade show " style="display:block;">
                <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalScrollableTitle">Product Details</h5>
                            <button type="button" class="close" @click="close()" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <h4>{{product.title}}</h4>
                                        </div>
                                        <div class="form-group">
                                            <label for="price">Price</label>
                                            <h5>{{product.price}}</h5>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mt-1 pt-1">
                                            <div class="image_upload">
                                                <img class="fitimage" :src="$axios.defaults.baseURL+'/image/product/'+product.image" :alt="product.title">
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group mt-2 pt-3">
                                    {{product.description}}
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <p><b>Created at: </b>{{new Date(product.created_at)}}</p>
                                        </div>
                                        <div class="form-group">
                                            <p><b>Updated at:</b> {{new Date(product.updated_at)}}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <p><b>Created By: </b><span v-if="product.created_by">{{product.created_by.name}}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button  @click="close()" type="button" class="btn btn-secondary" >Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate)

export default {
    data(){
        return{
            modal:false,
            product:{
                title:'',
                image:'',
                price:'',
                description:''
            },
        }
    },
    methods:{
       
        openViewModal(data){
            this.modal = true
            this.product = data
        },
        close(){
            this.modal = false
        }
    }
}
</script>
<style scoped>
    .display-none{
        display: none;
    }
    .modal-shadow{
        position:fixed;
        top:0;
        left:0;
        background-color: rgba(100, 100, 100, 0.5);
        height:100%;width:100%;
    }
    .open-modal{
        display: block;
    }
    .close-modal{
        display: none;
    }
    .image_upload {
        border: 1px solid #ccc;
        width: 15rem;
        height: 10rem;
        background: #eceef0;
        text-align: center;
        cursor: pointer;
        margin-left: 7%;
        position: relative;
    }
    .fitimage {
        width: 100%;
        height: 100%;
        background-color: #e6e6ef;
    }
</style>