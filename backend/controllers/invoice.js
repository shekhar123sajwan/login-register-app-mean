const invoiceModel = require('../models/invoice');
module.exports.findAll = async (req, res, next) => {};

module.exports.create = async (req, res) => {
    const { item, quantity, date, due, rate, tax } = req.body;

    if (!item) {
        return res.status(400).json({
            status: 400,
            error: true,
            message: 'item is required field',
            data: [],
        });
    }

    if (!quantity) {
        return res.status(400).json({
            status: 400,
            error: true,
            message: 'quantity is required field',
            data: [],
        });
    }

    if (!date) {
        return res.status(400).json({
            status: 400,
            error: true,
            message: 'date is required field',
            data: [],
        });
    }

    if (!due) {
        return res.status(400).json({
            status: 400,
            error: true,
            message: 'due is required field',
            data: [],
        });
    }

    if (!rate) {
        return res.status(400).json({
            status: 400,
            error: true,
            message: 'rate is required field',
            data: [],
        });
    }

    if (!tax) {
        return res.status(400).json({
            status: 400,
            error: true,
            message: 'tax is required field',
            data: [],
        });
    }

    invoiceModel
        .create({ item, quantity, date, due, rate, tax })
        .then((invoice) => {
            res.json({
                status: 201,
                error: false,
                message: 'Success',
                data: invoice,
            });
        })
        .catch((err) => {
            res.json({
                status: 500,
                error: true,
                message: err.message,
                data: [],
            });
        });
};
