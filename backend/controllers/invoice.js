const invoiceModel = require('../models/invoice');
const Joi = require('@hapi/joi');

module.exports.findAll = async (req, res, next) => {
    try {
        await invoiceModel.find().then((invoices) => {
            res.json({
                status: 200,
                error: false,
                message: 'Success',
                data: invoices,
            });
        });
    } catch (error) {
        return next(error);
    }
};

module.exports.create = async (req, res, next) => {
    //const { item, quantity, date, due, rate, tax } = req.body;
    // const error = new Error('OOPs');
    // error.status = 401;
    // const s = 0;
    // if (s) {
    //     return next(error);
    // } else {
    //     const error = new Error('sss');
    //     return next(error);
    // }

    // if (!item) {
    //     return res.status(400).json({
    //         status: 400,
    //         error: true,
    //         message: 'item is required field',
    //         data: [],
    //     });
    // }

    // if (!quantity) {
    //     return res.status(400).json({
    //         status: 400,
    //         error: true,
    //         message: 'quantity is required field',
    //         data: [],
    //     });
    // }

    // if (!date) {
    //     return res.status(400).json({
    //         status: 400,
    //         error: true,
    //         message: 'date is required field',
    //         data: [],
    //     });
    // }

    // if (!due) {
    //     return res.status(400).json({
    //         status: 400,
    //         error: true,
    //         message: 'due is required field',
    //         data: [],
    //     });
    // }

    // if (!rate) {
    //     return res.status(400).json({
    //         status: 400,
    //         error: true,
    //         message: 'rate is required field',
    //         data: [],
    //     });
    // }

    // if (!tax) {
    //     return res.status(400).json({
    //         status: 400,
    //         error: true,
    //         message: 'tax is required field',
    //         data: [],
    //     });
    // }

    const schema = Joi.object({
        item: Joi.string().required(),

        quantity: Joi.number().required(),

        date: Joi.date().required(),

        due: Joi.date().required(),

        rate: Joi.number(),

        tax: Joi.number(),
    });

    let values;
    try {
        values = await schema.validateAsync(req.body);
    } catch (err) {
        return next(err);
    }
    invoiceModel
        .create(values)
        .then((invoice) => {
            return res.json({
                status: 201,
                error: false,
                message: 'Success',
                data: invoice,
            });
        })
        .catch((err) => {
            return next(err);
        });
};

module.exports.findOne = async (req, res, next) => {
    const { id } = req.params;
    try {
        await invoiceModel.findById(id).then((invoice) => {
            if (!invoice) {
                res.status(404);
                return res.json({
                    status: 404,
                    error: true,
                    message: 'Invoice Not found.',
                    data: [],
                });
            }
            return res.json({
                status: 200,
                error: false,
                message: 'Invoice found.',
                data: invoice,
            });
        });
    } catch (error) {
        return next(error);
    }
};

module.exports.delete = async (req, res, next) => {
    const { id } = req.params;
    try {
        await invoiceModel.findByIdAndRemove(id).then((invoice) => {
            if (!invoice) {
                res.status(404);
                return res.json({
                    status: 404,
                    error: true,
                    message: 'Invoice Not found.',
                    data: [],
                });
            }
            return res.json({
                status: 200,
                error: false,
                message: 'Invoice Deleted.',
                data: invoice,
            });
        });
    } catch (error) {
        return next(error);
    }
};

module.exports.update = async (req, res, next) => {
    const { id } = req.params;
    const schema = Joi.object({
        item: Joi.string(),

        quantity: Joi.number(),

        date: Joi.date(),

        due: Joi.date(),

        rate: Joi.number(),

        tax: Joi.number(),
    });

    let values;
    try {
        values = await schema.validateAsync(req.body);
    } catch (err) {
        return next(err);
    }

    invoiceModel
        .findOneAndUpdate({ _id: id }, values, { new: true })
        .then((invoice) => {
            return res.json({
                status: 201,
                error: false,
                message: 'Invoice Updated',
                data: invoice,
            });
        })
        .catch((err) => {
            return next(err);
        });
};
