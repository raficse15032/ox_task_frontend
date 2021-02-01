<template>
    <div>
        <div class="container mt-3">
            <div class="col-md-12 mb-3">
                <div class="row">
                    <div class="col-md-3" style="margin:0;padding:0;text-align:left">
                        <button @click="openAddModal()" class="btn btn-primary"><i class="fas fa-plus"></i> Product</button>
                    </div>
                    <div class="col-md-6 text-center">
                        <h4>Product list</h4>
                    </div>
                    <div class="col-md-3" style="margin:0;padding:0;text-align:right">
                        <button @click="logout()" class="btn btn-danger"><i class="fas fa-power-off"></i> Logout</button> 
                    </div>
                </div>
            </div>

            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Serial</th>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th class="text-right" scope="col">Price </th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product,key) in products.data" :key="key">
                        <th v-if="products.from" scope="row">{{products.from+key}}</th>
                        <th v-else scope="row">{{key+1}}</th>
                        <td><img :src="$axios.defaults.baseURL+'/image/product/'+product.image" class="product-image" :alt="product.title"></td>
                        <td>{{product.title}}</td>
                        <td class="text-right">{{product.price}}</td>
                        <td><button class="btn btn-sm" @click="openEditModal(product,key)"><i class="far fa-edit"></i></button><button @click="openViewModal(product)" class="btn btn-sm"><i class="far fa-eye"></i></button><button @click="deleteProduct(product.id,key)" class="btn btn-sm"><i class="far fa-trash-alt"></i></button></td>
                    </tr>
                    <tr v-show="!loading && products.data.length == 0">
                        <td class="no-product text-center pt-4" colspan="5">
                            <i class="fas fa-box-open"></i>
                            <p>No product found</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <pagination :data="products" @pagination-change-page="getProducts"></pagination>
        </div>
        <loader v-show="loading"></loader>
        <addModal ref="add"></addModal>
        <editModal ref="edit"></editModal>
        <viewModal ref="view"></viewModal>
    </div>
</template>
<script>
import addModal from '@/components/product/AddModal'
import editModal from '@/components/product/EditModal'
import viewModal from '@/components/product/ViewModal'
import loader from '@/components/loader/Loader'
import {mapGetters} from "vuex"
import pagination from 'laravel-vue-pagination'
import Loader from '../../components/loader/Loader.vue'

export default {
    data(){
        return{
            loading:false
        }
    },
    methods:{
        getProducts(page=1){
            this.loading = true;
            this.$store.dispatch('ALL_PRODUCT',page).then(response=>{
                this.loading = false;
            })
            .catch(error=>{
                this.loading = false;        
            }); 
        },
        openAddModal(){
            this.$refs.add.openAddModal()
        },
        openEditModal(data,index){
            this.$refs.edit.openEditModal(data,index)
        },
        openViewModal(product){
            this.$refs.view.openViewModal(product)
        },
        deleteProduct(id,index){
            var self = this
            this.$swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.isConfirmed) {
                        self.loading = true
                        this.$store.dispatch('DELETE_PRODUCT',{id,index}).then(response=>{
                        self.loading = false
                        self.$swal(
                            'Deleted!',
                            'Your product has been deleted.',
                            'success'
                        )
                    })
                    .catch(error=>{   
                        self.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                        })    
                    }); 
                    
                }
            })
        },
        logout(){
            this.loading = true;
            this.$store.dispatch('LOGOUT_USER').then(response=>{
              this.loading = false 
              this.$auth.logout()
              this.$router.push('/login')
            })
            .catch(error=>{
              this.loading=false     
            });
            
        }
    },
    mounted(){
        this.getProducts();
    },
    computed: {
        ...mapGetters(["products"]),
    },
    components:{
        addModal,
        editModal,
        viewModal,
        loader,
        pagination
    }
}
</script>
<style scoped>
    .product-image{
        height: 50px;
        width: 60px;
    }
    .no-product{
        align-self: center;
        font-size: 20px;
        color: #888;
    }
    .fa-w-20{
        font-size: 40px;
    }
</style>