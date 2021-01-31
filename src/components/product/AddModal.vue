<template>
    <div>
        <div :class="modal?'open-modal':'close-modal'"  class="modal-shadow">
            <div  class="modal fade show " style="display:block;">
                <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalScrollableTitle">Add Product</h5>
                            <button type="button" class="close" @click="close()" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form ref="observer">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="title">Title</label>
                                            <input @keyup="vStatusOnAndRemoveError('title')" type="text" v-validate="'required'" name="title" v-model="product.title" class="form-control" id="title" placeholder="title">
                                            <span v-if="validation_status" class="red">{{ errors.first('title') }}</span>
                                            <p class="red" v-if="serveErrors"><span v-for="(error,key) in serveErrors.title" :key="key">{{error}}</span></p>
                                        </div>
                                        <div class="form-group">
                                            <label for="price">Price</label>
                                            <input @keyup="vStatusOnAndRemoveError('price')"  v-validate="'required'" min="0"  type="number" name="price" v-model="product.price" class="form-control" id="price" placeholder="price">
                                            <span v-if="validation_status"  class="red">{{ errors.first('price') }}</span>
                                            <p class="red" v-if="serveErrors"><span v-for="(error,key) in serveErrors.price" :key="key">{{error}}</span></p>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mt-1 pt-2">
                                            <div v-show="select_img" class="image_upload">
                                                <span class="removeImage" @click="removeImage()">X</span>
                                                <img  :src="url" class="fitimage" />
                                            </div>
                                            <div v-show="!select_img" class="image_upload" @click="$refs.image.click()">
                                                <p class="mt-4"><b>Upload image</b></p>
                                                <i class="fa fa-cloud-upload-alt"></i>
                                                <p>Image should be less than 1024 KB</p>
                                                <input
                                                    v-validate="'required|image|size:1024'"
                                                    name="image"
                                                    type="file"
                                                    ref="image"
                                                    class="file-input"
                                                    style="display: none"
                                                    @change="imageChanged"
                                                />
                                            </div>
                                            <span class="red">{{ errors.first('image') }}</span>
                                            <p class="red" v-if="serveErrors"><span v-for="(error,key) in serveErrors.image" :key="key">{{error}}</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="description">Description</label>
                                    <vue-editor @keyup="vStatusOnAndRemoveError('description')" name="description" v-validate="'required'" v-model="product.description"></vue-editor>
                                    <span v-if="validation_status"  class="red">{{ errors.first('description') }}</span>
                                    <p class="red" v-if="serveErrors"><span v-for="(error,key) in serveErrors.description" :key="key">{{error}}</span></p>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button v-if="!loading" @click="close()" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button v-if="!loading" @click="saveProduct()" type="button" class="btn btn-primary">Save changes</button>
                            <button disabled v-show="loading" type="button" class="btn btn-primary"><i class="fas fa-cog animation"></i> Saveing...</button>
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
import { VueEditor } from "vue2-editor";
export default {
    data(){
        return{
            modal:false,
            validation_status:false,
            index:'',
            url:'',
            select_img:false,
            product:{
                title:'',
                image:'',
                price:'',
                description:''
            },
            loading:false,
            serveErrors:''
        }
    },
    methods:{
        imageChanged (e) {
            var fileReader = new FileReader()
            fileReader.readAsDataURL(e.target.files[0])
            fileReader.onload = e => {
                this.product.image = e.target.result
                this.select_img = true
            }
            this.url = URL.createObjectURL(e.target.files[0])
            delete this.serveErrors['image']
        },
        removeImage () {
            this.$refs.image.value = null;
            this.product.image = ''
            this.url = ''
            this.select_img = false
        },
        saveProduct(){
            this.validation_status = true
            this.$validator.validateAll().then( result =>{
                if(result){
                    this.loading=true;
                    this.$store.dispatch('ADD_PRODUCT',this.product).then(response=>{
                        this.loading = false
                        this.modal = false
                        this.validation_status = false

                        this.$refs.image.value = null
                        this.select_img = false
                        this.product.title = ''
                        this.product.price = ''
                        this.product.description = ''
                        
                        this.$swal(
                            'Saved!',
                            'Your product has been saved.',
                            'success'
                        )
                    })
                    .catch(error=>{
                        this.loading=false;
                        this.serveErrors = error.response.data.errors
                        this.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                        })         
                    }); 
                }
            })
        },
        openAddModal(){
            this.modal = true
            
        },
        vStatusOnAndRemoveError(name){
            this.validation_status = true
            delete this.serveErrors[name];
        },
        close(){
            this.modal = false
        }
    },
    components:{
        VueEditor
    }
}
</script>
<style scoped>
    .required {
        color: red;
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
    .image_upload p {
        margin-top: 10px;
        font-size: 12px;
    }

    .fa-w-20 {
        font-size: 40px;
    }
    .display-none{
        display: none;
    }
    .removeImage {
        position: absolute;
        right: -7%;
        top: -7%;
        color:white;
        border: 1px solid;
        border-radius: 25px;
        padding: 4px 8px;
        background-color: #fb1212f5;
        font-size: 10px;
        font-family: cursive;
    }
    .fitimage {
        width: 100%;
        height: 100%;
        background-color: #e6e6ef;
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
    
</style>

