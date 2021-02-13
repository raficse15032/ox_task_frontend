<template>
    <div>
        <div class="container mt-3">
            <div class="col-md-12 mb-3">
                <div class="row">
                    <div class="col-md-3" style="margin:0;padding:0;text-align:left">
                        <button @click="openAddModal()" class="btn btn-primary"><i class="fas fa-plus"></i> Account</button>
                    </div>
                    <div class="col-md-6 text-center">
                        <h4>Account list</h4>
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
                        <th scope="col">Account Name</th>
                        <th scope="col">Bank</th>
                        <th scope="col">Account No</th>
                        <th scope="col">Branch</th>
                        <th scope="col">Account Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(account,key) in accounts.data" :key="key">
                        <th v-if="accounts.from" scope="row">{{accounts.from+key}}</th>
                        <th v-else scope="row">{{key+1}}</th>
                        
                        <td>{{account.account_name}}</td>
                        <td>{{account.bank ? account.bank.name:""}}</td>
                        <td>{{account.account_no}}</td>
                        <td>{{account.branch}}</td>
                        <td>{{account.account_type == 1?"Saving":""}}{{account.account_type == 2?"Current":""}}{{account.account_type == 3?"Joint":""}}</td>
                
                        <td><button class="btn btn-sm" @click="openEditModal(account,key)"><i class="far fa-edit"></i></button><button @click="deleteAccount(account.id,key)" class="btn btn-sm"><i class="far fa-trash-alt"></i></button></td>
                    </tr>
                    <tr v-show="!loading && accounts.data.length == 0">
                        <td class="no-account text-center pt-4" colspan="7">
                            <i class="fas fa-box-open"></i>
                            <p>No account found</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <pagination :data="accounts" @pagination-change-page="getAccounts"></pagination>
        </div>
        <loader v-show="loading"></loader>
        <addEditModal :organizations="organizations" ref="add_edit"></addEditModal>
    </div>
</template>
<script>
import addEditModal from '@/components/account/AddEditModal'
import loader from '@/components/loader/Loader'
import {mapGetters} from "vuex"
import pagination from 'laravel-vue-pagination'
export default {
    data(){
        return{
            loading:false,
            organizations:[]
        }
    },
    methods:{
        getAccounts(page=1){
            this.loading = true;
            this.$store.dispatch('ALL_ACCOUNT',page).then(response=>{
                this.loading = false;
            })
            .catch(error=>{
                this.loading = false;        
            }); 
        },
        getOrganization(){
            this.$axios.get('api/organization').then(response => {
                this.organizations = response.data
            })
        },
        openAddModal(){
            this.$refs.add_edit.openAddModal()
        },
        openEditModal(data,index){
            this.$refs.add_edit.openEditModal(data,index)
        },
        openViewModal(account){
            this.$refs.view.openViewModal(account)
        },
        deleteAccount(id,index){
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
                        this.$store.dispatch('DELETE_ACCOUNT',{id,index}).then(response=>{
                        self.loading = false
                        self.$swal(
                            'Deleted!',
                            'Your account has been deleted.',
                            'success'
                        )
                    })
                    .catch(error=>{  
                        self.loading = false 
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
        this.getAccounts();
        this.getOrganization();
    },
    computed: {
        ...mapGetters(["accounts"]),
    },
    components:{
        addEditModal,
        loader,
        pagination
    }
}
</script>
<style scoped>
    .account-image{
        height: 50px;
        width: 60px;
    }
    .no-account{
        align-self: center;
        font-size: 20px;
        color: #888;
    }
    .fa-w-20{
        font-size: 40px;
    }
</style>