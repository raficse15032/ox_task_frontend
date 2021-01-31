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
                            <form>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="title">Title</label>
                                            <input ref="title" type="text" v-validate="'required'" name="title" v-model="product.title" class="form-control" id="title" placeholder="title">
                                            <span class="red">{{ errors.first('title') }}</span>
                                        </div>
                                        <div class="form-group">
                                            <label for="price">Price</label>
                                            <input ref="price" v-validate="'required'" min="0"  type="number" name="price" v-model="product.price" class="form-control" id="price" placeholder="price">
                                            <span class="red">{{ errors.first('price') }}</span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mt-1 pt-2">
                                            <div v-show="select_img" class="image_upload">
                                                <span class="removeImage" @click="removeImage()">X</span>
                                                <img  :src="url" class="fitimage" />
                                            </div>
                                            <div v-show="!select_img" class="image_upload" @click="$refs.image.click()">
                                                <p>Image</p>
                                                <i class="fa fa-cloud-upload-alt"></i>
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
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="description">Description</label>
                                    <textarea ref="description" name="description" v-validate="'required'" id="description" v-model="product.description" class="form-control"></textarea>
                                    <span class="red">{{ errors.first('description') }}</span>
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

export default {
    data(){
        return{
            modal:false,
            index:'',
            url:'',
            select_img:false,
            product:{
                title:'',
                image:'',
                price:'',
                description:''
            },
            loading:false
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
        },
        removeImage () {
            this.$refs.image.value = null;
            this.product.image = ''
            this.url = ''
            this.select_img = false
        },
        saveProduct(){
            this.$validator.validateAll().then( result =>{
                if(result){
                    this.loading=true;
                    this.$store.dispatch('ADD_PRODUCT',this.product).then(response=>{
                        this.loading = false;
                        this.modal = false;
                        this.$swal(
                            'Saved!',
                            'Your product has been saved.',
                            'success'
                        )
                    })
                    .catch(error=>{
                        this.loading=false;
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
            this.$refs.title.value = null
            this.$refs.price.value = null
            this.$refs.image.value = null
            this.$refs.description.value = null
        },
        close(){
            this.modal = false
        }
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