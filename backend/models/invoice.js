const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema(
    {
        item: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        due: {
            type: Date,
            required: true,
        },
        rate: {
            type: Number,
        },
        tax: {
            type: Number,
        },
    },
    {
        toObject: { versionKey: false },
    }
);

const InvoiceModel = new mongoose.model('Invoice', InvoiceSchema);
module.exports = InvoiceModel;
