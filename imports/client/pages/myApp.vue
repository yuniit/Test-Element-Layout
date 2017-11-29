<template>
    <div>
        <div class="layout">
            <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" style="padding:0 40px;height:63px;">
                <el-row :gutter="20">
                    <el-col :span="4">
                        <div style="padding-top:4px;">
                            <a href="#">
                                <img src="Automoto Logo.png" width="135px;" style="border:1px solid #FB8C00;border-radius:3px;">
                            </a>
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <i class="el-icon-search search-icon"></i>
                    </el-col>
                    <el-col :span="10" style="float:right">
                        <el-menu-item index="3" class="nav-link">Do</el-menu-item>
                        <el-menu-item index="4" class="nav-link">Grow</el-menu-item>
                        <el-submenu index="2" class="nav-link">
                            <template slot="title">Plan</template>
                            <el-menu-item index="2-1">Plan one</el-menu-item>
                            <el-menu-item index="2-2">Plan two</el-menu-item>
                            <el-menu-item index="2-3">Plan three</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="1" class="nav-link">Learn</el-menu-item>
                    </el-col>
                </el-row>
            </el-menu>
            <div class="layout-content">
                <h2 class="heading center-text">Customer Form</h2>
                <el-row :gutter="20" style="margin-bottom:20px;">
                    <el-col :span="12" :offset="5">
                        <el-form :model="customerForm" ref="customerForm" :rules="customerRule" label-width="110px">
                            <el-row :gutter="20">
                                <el-col :span="24">
                                    <el-form-item label="Name :" prop="name">
                                        <el-input type="text" v-model="customerForm.name"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="Gender :" prop="gender">
                                        <el-select v-model="customerForm.gender" placeholder="Customer gender">
                                            <el-option v-for="item in genderOpt" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="Date of birth :" prop="dob">
                                        <el-date-picker v-model="customerForm.dob" default-value="12-04-1998" type="date" placeholder="Customer Birthday">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="Email :" prop="email">
                                        <el-input type="text" v-model="customerForm.email"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="Address :" prop="address">
                                        <el-input type="textarea" v-model="customerForm.address" :autosize="{ minRows: 3}"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="Tel :" prop="tel">
                                        <el-input type="text" v-model="customerForm.tel"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-button type="primary" v-loading="loadingAddCustomer" @click="handleAddCustomer()" style="margin-left:110px;">Submit</el-button>
                            <el-button plain type="warning" @click="resetCustomerForm()" style="float:right;">Reset</el-button>
                        </el-form>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom:20px;">
                    <el-col :span="22" :offset="1">
                        <el-table :data="customerData" v-loading.body="loadingCustomerTable" border style="width:100%">
                            <el-table-column label="Name" prop="name" width="170">
                            </el-table-column>
                            <el-table-column label="Gender" prop="gender" width="120">
                            </el-table-column>
                            <el-table-column label="Birthday" prop="dob" width="150" :formatter="dateFormat">
                            </el-table-column>
                            <el-table-column label="Email" prop="email" width="220">
                            </el-table-column>
                            <el-table-column label="Address" prop="address" width="248">
                            </el-table-column>
                            <el-table-column label="Tel" prop="tel" width="160">
                            </el-table-column>
                            <el-table-column label="Remove" width="95">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="handleRemoveCustomer(scope.row)" size="small" plain>Remove</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </div>
            <div class="layout-footer">
                <p class="footer-text">&copy; Just Example Of Element Layout</p>
            </div>
        </div>
    </div>
</template>
<script>
import Customer from '../../api/collections/customers';
import Item from '../../api/collections/items';
import SaleItem from '../../api/collections/saleItems';

export default {
    name: 'app',
    data() {
        return {
            loadingCustomerTable: false,
            loadingAddCustomer: false,
            activeIndex: '1',
            activeIndex2: '1',
            customerData: [],
            customerForm: {
                name: '',
                gender: '',
                dob: '',
                email: '',
                address: '',
                tel: ''
            },
            customerRule: {
                name: [
                    { required: true, message: '' }
                ],
                gender: [
                    { required: true, message: '' }
                ],
                dob: [
                    { required: true, message: '' }
                ],
                email: [
                    { required: true, message: '' }
                ],
                address: [
                    { required: true, message: '' }
                ],
                tel: [
                    { required: true, message: '' }
                ]
            },
            genderOpt: [
                {
                    label: 'Male',
                    value: 'Male'
                }, {
                    label: 'Famale',
                    value: 'Famale'
                }
            ]
        }
    },
    created() {
        this.callCustomer();
    },
    methods: {
        callCustomer() {
            Meteor.call('callCustomers', (err, res) => {
                if (!err) {
                    this.customerData = res;
                }
            })
        },
        handleAddCustomer() {
            let data = {
                name: this.customerForm.name,
                gender: this.customerForm.gender,
                dob: this.customerForm.dob,
                email: this.customerForm.email,
                address: this.customerForm.address,
                tel: this.customerForm.tel
            }
            this.$refs.customerForm.validate((valid) => {
                if (valid) {
                    this.loadingAddCustomer = true;
                    Meteor.call('insertCustomers', data, (err, res) => {
                        if (!err) {
                            this.callCustomer();
                            this.loadingAddCustomer = false;
                            this.$message.success({ message: 'Customer add done !' })
                            this.resetCustomerForm();
                        }
                    })
                }
                else {
                    setTimeout(() => {
                        this.resetCustomerForm();
                        this.resetCustomerForm();
                    }, 2500);
                }
            })
        },
        handleRemoveCustomer(row) {
            this.$confirm('This also remove from database , Are you sure?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'waning'
            })
                .then(() => {
                    this.loadingCustomerTable = true;
                    Meteor.call('removeCustomer', row._id, (err, res) => {
                        if (!err) {
                            this.loadingCustomerTable = false;
                            this.callCustomer();
                            this.$message.success({ message: ' Remove is completed !!' })
                        }
                    })
                })
                .catch(() => {
                    this.$message.warning({ message: 'Remove is incompleted !!' })
                })
        },
        resetCustomerForm() {
            this.$refs.customerForm.resetFields();
        },
        dateFormat: (row, column) => {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("DD/MM/YYYY");
        },
    }
}
</script>

<style scoped>
/* Costumize element-ui css */

.layout {
    border: 0;
    background-color: #E0E0E0;
}

.layout-content {
    min-height: 100%;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 2px;
}

.layout-footer {
    border: 1px solid #90A4AE;
    border-radius: 2px;
    text-align: center;
    padding: 10px 10px;
    color: #455A64;
    background-color: #F5F5F5;
}

.el-menu-demo {
    background-color: #F5F5F5;
    border: 1px solid #90A4AE;
}

.el-menu-item {
    color: #455A64;
}

.el-menu--horizontal .el-submenu .el-submenu__title {
    height: 63px !important;
}

.el-submenu .el-menu-item {
    font-weight: normal;
}

.el-submenu {
    float: right !important;
}

.el-menu-item.is-active {
    color: #455A64;
    border-bottom: 5px solid #FB8C00;
}

.el-submenu.is-active .el-submenu__title {
    border-bottom: 5px solid #FB8C00;
    height: 63px;
}

.el-menu--horizontal>.el-menu-item:hover {
    border-bottom-color: #FB8C00;
    border-bottom-width: 5px;
}

.el-input__inner:focus {
    border-color: #FB8C00;
}






/* My own css costumize */

.nav-link {
    font-family: Arial, sans-serif;
    font-weight: 600;
}

.search-icon     {
    float: right;
    line-height: 55px;
    margin-right: 50px;
    font-size: 30px;
    color: #455A64;
    border-bottom: 5px solid transparent;
    padding-left: 10px;
    padding-right: 10px;
}

.search-icon:hover {
    cursor: pointer;
    background-color: #eef1f6;
}

.el-menu--horizontal .nav-link {
    float: right;
}

.heading {
    font-size: 25px;
    color: #FB8C00;
    margin: 30px 0;
}

.center-text {
    text-align: center;
}

.footer-text {
    margin: 10px 0;
    color: #455A64;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
    font-family: Arial, sans-serif;
    ;
}
</style>