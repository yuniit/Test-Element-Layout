import { Meteor } from 'meteor/meteor';

import Customer from './collections/customers';
import Item from './collections/items';
import SaleItem from './collections/saleItems';

Meteor.methods({
    // Start Find || Call Methods
    callCustomers() {
        return Customer.find().fetch();
    },
    callItems() {
        return Item.find().fetch();
    },
    callSaleItems() {
        return SaleItem.find().fetch();
    },
    findOneSaleItem(_id) {
        return Item.findOne({ _id: _id });
    },
    findSaleReport() {
        let saleDoc = SaleItem.aggregate([
            {
                $lookup: {
                    from: "customer",
                    localField: "cusName",
                    foreignField: "_id",
                    as: "cusDoc"
                }
            },
            {
                $unwind: { path: '$cusDoc', preserveNullAndEmptyArrays: true }
            },
            {
                $lookup: {
                    from: "item",
                    localField: "itemName",
                    foreignField: "_id",
                    as: "itemDoc"
                }
            },
            {
                $unwind: { path: '$itemDoc', preserveNullAndEmptyArrays: true }
            },
            {
                $group: {
                    _id: '$_id',
                    cusName: { $last: '$cusDoc.name' },
                    itemName: { $last: '$itemDoc.name' },
                    itemPrice: { $last: '$itemPrice' },
                    saleQuantity: { $last: '$saleQuantity' },
                    dateOutStock: { $last: '$dateOutStock' },
                    amountPrice: { $last: '$amountPrice' }
                }
            }
        ])
        return saleDoc;
    },
    // End Find || Call Methods

    // Start Insert Methods
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
    // End Insert Methods

    // Start Remove Methods
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
    // End Remove Methods
})