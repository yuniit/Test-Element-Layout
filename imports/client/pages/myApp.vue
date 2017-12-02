<template>
    <div>
        <div class="layout">
            <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" style="padding:0 40px;height:63px;">
                <el-row :gutter="20">
                    <el-col :span="4">
                        <div style="padding-top:4px;">
                            <a href="#">
                                <img src="Automoto Logo.png" width="135px;" style="border:1px solid #FB8C00;">
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
                <!-- Start Customer Form -->
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
                <!-- End Customer Form -->

                <!-- Start Customer Report -->
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
                <hr>
                <!-- End Customer Report -->

                <!-- Start Item Form -->
                <h2 class="heading center-text">Item Form</h2>
                <el-row :gutter="20" style="margin:20px 0;">
                    <el-col :span="14" :offset="5">
                        <el-form :model="itemForm" ref="itemForm" :rules="itemRule" label-width="120px">
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="Name :" prop="name">
                                        <el-input type="text" v-model="itemForm.name">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="Price :" prop="price">
                                        <el-input-number v-model="itemForm.price" @change="handleChangeItemPrice" :controls="false" :debounce="700"></el-input-number>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="Instock Quantity :" prop="instockQuantity">
                                        <el-input-number v-model="itemForm.instockQuantity" @change="handleChangeItemQuantity" :min="1" :max="500">
                                        </el-input-number>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="Category :" prop="cate">
                                        <el-select v-model="itemForm.cate" placeholder="Select category">
                                            <el-option v-for="item in cateOpt" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="Date Instock :" prop="dateInStock">
                                        <el-date-picker v-model="itemForm.dateInStock" type="date" placeholder="Date items arrive stock">
                                            </el-date-pickerf>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="Amount Price :" prop="amountPrice">
                                        <el-input v-model="itemForm.amountPrice" :readonly="readonly">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-button type="primary" @click="handleAddItem()" v-loading="loadingAddItem" style="margin-left:120px;">Submit</el-button>
                        </el-form>
                    </el-col>
                </el-row>
                <hr>
                <!-- End Item Form -->

                <!-- Start Sale Form  -->
                <h2 class="heading center-text">Sale Form</h2>
                <el-row :gutter="20" style="margin:20px 0;">
                    <el-col :span="14" :offset="5">
                        <el-form :model="saleForm" ref="saleForm" :rules="saleRule" label-width="125px">
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="Customer Name :" prop="cusName">
                                        <el-select v-model="saleForm.cusName" filterable placeholder="Customer">
                                            <el-option v-for="item in customerData" :key="item._id" :label="item.name" :value="item._id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="Item Name :" prop="itemName">
                                        <el-select v-model="saleForm.itemName" filterable placeholder="Item" @change="handleChangeSaleItem">
                                            <el-option v-for="item in itemData" :key="item._id" :label="item.name" :value="item._id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="Item Price :" prop="itemPrice">
                                        <el-input type="text" v-model="saleForm.itemPrice" readonly="readonly">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="Sale Quantity :" prop="saleQuantity">
                                        <el-input-number v-model="saleForm.saleQuantity" @change="handleChangeSaleQuantity">
                                        </el-input-number>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="Date Outstock :" prop="dateOutStock">
                                        <el-date-picker v-model="saleForm.dateOutStock" type="date" placeholder="Date items out stock">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="Amount Price :" prop="amountPrice">
                                        <el-input v-model="saleForm.amountPrice" :readonly="readonly">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-button type="primary" @click="handleAddSale()" v-loading="loadingAddSale" style="margin-left:125px;">Submit</el-button>
                        </el-form>
                    </el-col>
                </el-row>
                <!-- End Sale Form -->

                <!-- Start Report Sale -->
                <el-row :gutter="20" style="margin:20px 0;">
                    <el-col :span="20" :offset="2">
                        <el-table :data="saleReportDoc" v-loading="loadingSaleTable" border style="width:100%">
                            <el-table-column label="Customer Name" prop="cusName" width="170">
                            </el-table-column>
                            <el-table-column label="Item Name" prop="itemName" width="170">
                            </el-table-column>
                            <el-table-column label="Item Price" prop="itemPrice" width="153" :formatter="priceFormat">
                            </el-table-column>
                            <el-table-column label="Quantity" prop="saleQuantity" width="100">
                            </el-table-column>
                            <el-table-column label="Date Outstock" prop="dateOutStock" width="170" :formatter="dateFormat">
                            </el-table-column>
                            <el-table-column label="Amout Price" prop="amountPrice" width="170" :formatter="priceFormat">
                            </el-table-column>
                            <el-table-column label="Remove" width="106">
                                <template scope="scope">
                                    <el-button type="danger" @click="handleRemoveSale(scope.row)" size="small" plain>Remove</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <!-- End Report Sale -->
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

            readonly: true,
            activeIndex: '1',
            activeIndex2: '1',

            // All Loading 
            loadingAddCustomer: false,
            loadingCustomerTable: false,
            loadingAddItem: false,
            loadingAddSale: false,
            loadingSaleTable: false,
            // End All Loading 

            // Customer Form Value
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
            ],
            // End Customer Form Value

            // Item Form Value
            itemData: [],
            itemForm: {
                name: '',
                price: '',
                cate: '',
                dateInStock: '',
                instockQuantity: '',
                amountPrice: '',
            },
            itemRule: {
                name: [
                    { required: true, message: '' }
                ]
            },
            cateOpt: [
                {
                    label: 'Soft drink',
                    value: 'Soft drink'
                },
                {
                    label: 'Vegetable',
                    value: 'Vegetable'
                },
                {
                    label: 'Food',
                    value: 'Food'
                }
            ],
            // End Item Form Value

            // Sale Form Value
            saleData: [],
            saleReportDoc: [],
            saleForm: {
                cusName: '',
                itemName: '',
                itemPrice: '',
                saleQuantity: '',
                dateOutStock: '',
                amountPrice: '',
            },
            saleRule: {
                cusName: [
                    { required: true, message: '' }
                ],
                itemName: [
                    { required: true, message: '' }
                ]
            }
            // End Sale Form Value
        }
    },
    created() {
        this.callCustomer();
        this.callItem();
        this.callSale();
        this.callSaleReport();
    },
    methods: {
        // End Select Change Methods
        handleChangeItemQuantity(val) {
            return this.itemForm.amountPrice = val * this.itemForm.price;
        },
        handleChangeItemPrice(val) {
            return this.itemForm.amountPrice = val * this.itemForm.instockQuantity;
        },
        handleChangeSaleItem(val) {
            Meteor.call('findOneSaleItem', val, (err, res) => {
                if (!err) {
                    this.saleForm.itemPrice = res.price;
                }
            })
        },
        handleChangeSaleQuantity(val) {
            this.saleForm.amountPrice = val * this.saleForm.itemPrice;
        },
        // End Select Change Methods

        // Start Call || Find methods
        callCustomer() {
            Meteor.call('callCustomers', (err, res) => {
                if (!err) {
                    this.customerData = res;
                }
            })
        },
        callItem() {
            Meteor.call('callItems', (err, res) => {
                if (!err) {
                    this.itemData = res;
                }
            })
        },
        callSale() {
            Meteor.call('callSaleItems', (err, res) => {
                if (!err) {
                    this.saleData = res;
                }
            })
        },
        callSaleReport() {
            Meteor.call('findSaleReport', (err, res) => {
                if (!err) {
                    this.saleReportDoc = res;
                }
            })
        },
        // End Call || Find methods

        // Start Insert Methods
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
                            this.$message.success({ message: 'Customer data is complete added !' })
                            this.resetCustomerForm();
                        }
                    })
                }
                else {
                    setTimeout(() => {
                        this.resetCustomerForm();
                    }, 2500);
                }
            })
        },
        handleAddItem() {
            let data = {
                name: this.itemForm.name,
                price: this.itemForm.price,
                cate: this.itemForm.cate,
                dateInStock: this.itemForm.dateInStock,
                instockQuantity: this.itemForm.instockQuantity,
                amountPrice: this.itemForm.amountPrice,
            }
            this.$refs.itemForm.validate((valid) => {
                if (valid) {
                    this.loadingAddItem = true;
                    Meteor.call('insertItems', data, (err, res) => {
                        if (!err) {
                            this.loadingAddItem = false;
                            this.callItem();
                            this.resetItemForm();
                            this.$message.success({ message: 'Item data is complete added !' })
                        }
                    })
                }
                else {
                    setTimeout(() => {
                        this.resetItemForm();
                    }, 2500);
                }
            })
        },
        handleAddSale() {
            let data = {
                cusName: this.saleForm.cusName,
                itemName: this.saleForm.itemName,
                itemPrice: this.saleForm.itemPrice,
                saleQuantity: this.saleForm.saleQuantity,
                dateOutStock: this.saleForm.dateOutStock,
                amountPrice: this.saleForm.amountPrice,
            }
            this.$refs.saleForm.validate((valid) => {
                if (valid) {
                    this.loadingAddSale = true;
                    Meteor.call('insertSaleItems', data, (err, res) => {
                        this.loadingAddSale = false;
                        this.callSale();
                        this.callSaleReport();
                        this.resetSaleForm();
                        this.$message.success({ message: 'Sale data is complete added !' })
                    })
                }
                else {
                    setTimeout(() => {
                        this.resetSaleForm();
                    }, 2500);
                }
            })
        },
        // End Insert methods

        // Start Remove Methods
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
        handleRemoveSale(row) {
            this.$confirm('This also remove from database , Are you sure?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'waning'
            })
                .then(() => {
                    this.loadingSaleTable = true;
                    Meteor.call('removeSaleItem', row._id, (err, res) => {
                        if (!err) {
                            this.loadingSaleTable = false;
                            this.callSaleReport();
                            this.$message.success({ message: ' Remove is completed !!' })
                        }
                    })
                })
                .catch(() => {
                    this.$message.warning({ message: 'Remove is incompleted !!' })
                })
        },
        // End Remove Methods

        // Start Reset Form Methods
        resetCustomerForm() {
            this.$refs.customerForm.resetFields();
        },
        resetItemForm() {
            this.$refs.itemForm.resetFields();
        },
        resetSaleForm() {
            this.$refs.saleForm.resetFields();
        },
        // End Reset Form Methods

        // Start etc Methods ....
        dateFormat: (row, column) => {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("DD/MM/YYYY");
        },
        priceFormat: (row, column) => {
            var price = row[column.property];
            if (price.lenght == 0) {
                return "";
            }
            return price += ' $';
        },
        // End etc Methods ....
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
}

.layout-footer {
    border: 1px solid #90A4AE;
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

.el-button--primary {
    background-color: #FB8C00;
}

















































/* My own css costumize */

.nav-link {
    font-family: Arial, sans-serif;
    font-weight: 600;
}

.search-icon {
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

hr {
    border-color: #FB8C00;
    border-top-width: 0;
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