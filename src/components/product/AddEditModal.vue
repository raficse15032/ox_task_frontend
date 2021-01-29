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
                        <form @submit.prevent="saveProduct()">
                            <div class="form-group">
                                <label for="title">Title</label>
                                <input type="text" v-model="product.title" class="form-control" id="title" placeholder="title">
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="price">Price</label>
                                        <input type="text" v-model="product.price" class="form-control" id="price" placeholder="price">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div>
                                        <div v-show="select_img" class="image_upload">
                                            <span class="removeImage" @click="removeImage()">X</span>
                                            <img  :src="url" class="fitimage" />
                                        </div>
                                        <div v-show="!select_img" class="image_upload" @click="$refs.ImageFile.click()">
                                            <p>Image</p>
                                            <i class="fa fa-cloud-upload-alt"></i>
                                            <input
                                                type="file"
                                                ref="ImageFile"
                                                class="file-input"
                                                style="display: none"
                                                @change="imageChanged"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="description">Description</label>
                                <textarea id="description" v-model="product.description" class="form-control"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button @click="close()" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            modal:true,
            url:'',
            select_img:false,
            product:{
                title:'',
                image_64:'',
                price:'',
                description:''
            }
        }
    },
    methods:{
        imageChanged (e) {
            var fileReader = new FileReader()
            fileReader.readAsDataURL(e.target.files[0])
            fileReader.onload = e => {
                this.product.image_64 = e.target.result
                this.select_img = true
            }
            this.url = URL.createObjectURL(e.target.files[0])
        },
        removeImage () {
            this.$refs.ImageFile.value = null;
            this.product.image_64 = ''
            this.url = ''
            this.select_img = false
        },
        saveProduct(){
            this.$axios.post('api/product',this.product).then(response=>{
                console.log(response.data)
            })
        },
        open(){
            this.modal = true
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
        width: 160px;
        height: 120px;
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
         animation: fadein 2s;
        -moz-animation: fadein 2s; /* Firefox */
        -webkit-animation: fadein 2s; /* Safari and Chrome */
        -o-animation: fadein 2s; 
        display: none;
    }
    @keyframes fadein {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
</style>