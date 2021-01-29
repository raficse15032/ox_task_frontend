<template>
    <div>
        <p>Product</p>
        <div class="container">
            <div class="col-md-12 mb-3">
                <div class="row">
                    <div class="col-md-3" style="margin:0;padding:0;text-align:left">
                        <button class="btn btn-primary"><i class="fas fa-plus"></i> Product</button>
                    </div>
                    <div class="col-md-6 text-center">
                        <h4>Product list</h4>
                    </div>
                    <div class="col-md-3" style="margin:0;padding:0;text-align:right">
                        <button class="btn btn-danger"><i class="fas fa-power-off"></i> Logout</button> 
                    </div>
                </div>
            </div>

            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Serial</th>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product,key) in products.data" :key="key">
                        <th scope="row">{{products.from+key}}</th>
                        <td><img :src="$axios.defaults.baseURL+'/image/product/'+product.image" class="product-image" :alt="product.title"></td>
                        <td>{{product.title}}</td>
                        <td>{{product.price}}</td>
                        <td><i class="far fa-edit pointer"></i> <i class="far fa-eye pointer"></i> <i class="far fa-trash-alt pointer"></i></td>
                    </tr>
                </tbody>
            </table>
            <pagination :data="products" @pagination-change-page="getProducts"></pagination>
        </div>
        
        <addEditModal></addEditModal>
    </div>
</template>
<script>
import addEditModal from '@/components/product/AddEditModal'
import {mapGetters} from "vuex"
import pagination from 'laravel-vue-pagination'
export default {
    components:{
        addEditModal,
        pagination
    },
    methods:{
        getProducts(page=1){
            this.$store.dispatch('ALL_PRODUCT',page).then(response=>{
                // this.loading=false;
            })
            .catch(error=>{
                // this.loading=true;        
            }); 
        }
    },
    mounted(){
        this.getProducts();
    },
    computed: {
        ...mapGetters(["products"]),
    },
}
</script>
<style scoped>
    .product-image{
        height: 50px;
        width: 60px;
    }
    
</style>