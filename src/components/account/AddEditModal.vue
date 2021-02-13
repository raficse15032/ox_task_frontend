<template>
    <div>
        <div :class="modal?'open-modal':'close-modal'"  class="modal-shadow">
            <div  class="modal fade show " style="display:block;">
                <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalScrollableTitle">{{update?"Update Account":"Add Account"}}</h5>
                            <button type="button" class="close" @click="close()" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form ref="observer">
                                <div class="form-group">
                                    <label for="description">Select Bank</label>
                                    <select v-model="account.financial_organization_id" name="Bank" v-validate="'required'" class="form-control" >
                                        <option  value="">Select Bank</option>
                                        <option v-for="(organization,key) in organizations" :key="key" :value="organization.id">{{organization.name}}</option>
                                    </select>
                                    <span v-if="validation_status"  class="red">{{ errors.first('Store_id') }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="description">Store Id</label>
                                    <input v-model="account.store_id" v-validate="'required'" name="Store_id" type="number" class="form-control">
                                    <span v-if="validation_status"  class="red">{{ errors.first('Store_id') }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="description">Account Name</label>
                                    <input v-model="account.account_name"  v-validate="'required'" name="Account_Name" type="text" class="form-control">
                                    <span v-if="validation_status"  class="red">{{ errors.first('Account_Name') }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="description">Account No</label>
                                    <input v-model="account.account_no"  v-validate="'required'" name="Account_No" type="text" class="form-control">
                                    <span v-if="validation_status"  class="red">{{ errors.first('Account_No') }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="description">Branch</label>
                                    <input v-model="account.branch" v-validate="'required'" name="Branch" type="text" class="form-control">
                                    <span v-if="validation_status"  class="red">{{ errors.first('Branch') }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="description">Select Type</label>
                                    <select v-model="account.account_type" v-validate="'required'" name="Account_type" class="form-control">
                                        <option  value="">Account Type</option>
                                        <option  value="1">Saving</option>
                                        <option  value="2">Current</option>
                                        <option  value="3">Joint</option>
                                    </select>
                                    <span v-if="validation_status"  class="red">{{ errors.first('Account_type') }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="description">Swift Code</label>
                                    <input v-model="account.swift_code" v-validate="'required'" name="Swift_Code" type="text" class="form-control">
                                    <span v-if="validation_status"  class="red">{{ errors.first('Swift_Code') }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="description">Route No</label>
                                    <input v-model="account.route_no" v-validate="'required'" name="Route_no" type="text" class="form-control">
                                    <span v-if="validation_status"  class="red">{{ errors.first('Route_no') }}</span>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button v-if="!loading" @click="close()" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button v-if="!loading && !update" @click="saveProduct()" type="button" class="btn btn-primary">Save changes</button>
                            <button v-if="!loading && update" @click="updateProduct()" type="button" class="btn btn-primary">Update changes</button>
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
    props:['organizations'],
    data(){
        return{
            modal:false,
            validation_status:false,
            index:'',
            update:false,
            account:{
                financial_organization_id:'',
                store_id:'',
                account_name:'',
                account_no:'',
                branch:'',
                account_type:'',
                swift_code:'',
                route_no:''
            },
            loading:false,
            serveErrors:''
        }
    },
    methods:{
        
        saveProduct(){
            this.validation_status = true
            this.$validator.validateAll().then( result =>{
                if(result){
                    this.loading=true;
                    this.$store.dispatch('ADD_ACCOUNT',this.account).then(response=>{
                        this.loading = false
                        this.modal = false
                        this.validation_status = false
                        this.$swal(
                            'Saved!',
                            'Account has been saved.',
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
            this.update = false
            this.modal = true
            this.validation_status = false
            this.account.financial_organization_id = ''
            this.account.store_id = ''
            this.account.account_name = ''
            this.account.account_no = ''
            this.account.branch = ''
            this.account.account_type = ''
            this.account.swift_code = ''
            this.account.route_no = ''
        },
        openEditModal(data, index){
            this.modal = true
            this.update = true
            this.account = Object.assign({},data)
            this.index = index
            this.validation_status = true
        },
        vStatusOnAndRemoveError(name){
            this.validation_status = true
            delete this.serveErrors[name];
        },
        close(){
            this.modal = false
        },
        updateProduct(){
            this.$validator.validateAll().then( result =>{
                if(result){
                    this.loading=true;
                    var data =  this.account
                    var index = this.index

                    this.$store.dispatch('UPDATE_ACCOUNT',{data,index}).then(response=>{
                        this.loading = false;
                        this.modal = false;
                        this.validation_status = false;
                        this.$swal(
                            'Updated!',
                            'Account has been updated.',
                            'success'
                        )
                    })
                    .catch(error=>{
                        this.loading=false
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

