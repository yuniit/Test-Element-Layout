import { Meteor } from 'meteor/meteor';

import Customer from './collections/customers';
import Item from './collections/items';
import SaleItem from './collections/saleItems';

Meteor.methods({
    callCustomers() {
        return Customer.find().fetch();
    },
    callItems() {
        return Item.find().fetch();
    },
    callSaleItems() {
        return SaleItem.find().fetch();
    },
    insertCustomers(data) {
        Meteor._sleepForMs(1500)
        return Customer.insert(data);
    },
    insertItems(data) {
        Meteor._sleepForMs(1500)
        return Item.insert(data);
    },
    insertSaleItems(data) {
        Meteor._sleepForMs(1500)
        return SaleItem.insert(data);
    },
    removeCustomer(_id) {
        Meteor._sleepForMs(1500)
        return Customer.remove({ _id: _id })
    },
    removeItem(_id) {
        Meteor._sleepForMs(1500)
        return Item.remove({ _id: _id })
    },
    removeSaleItem(_id) {
        Meteor._sleepForMs(1500)
        return SaleItem.remove({ _id: _id })
    },

})