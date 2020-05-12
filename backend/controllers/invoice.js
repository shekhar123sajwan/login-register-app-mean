const invoiceModel = require('../models/invoice');
const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
var moment = require('moment');

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
            res.status(201);
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
    console.log(req.params);
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
                message: 'Invoice Updated.',
                data: invoice,
            });
        })
        .catch((err) => {
            return next(err);
        });
};

//localhost:3000/api/invoices?sort=undefined&order=&limit=2&filter=&pages=0

module.exports.search = async (req, res, next) => {
    const { sort, order, limit, filter, pages } = req.query;
    const offset = Math.abs((pages - 1) * limit);
    const sortOrder =
        sort != 'undefined' && order != '' ? `${order == 'desc' ? '-' : ''}${sort}` : {};
    const filterParams = {};

    if (filter) {
        Object.assign(filterParams, { $or: [] });
        filterParams.$or.push({ item: { $regex: filter, $options: 'i' } });
        console.log(filter);
        datePat = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        if (filter.match(datePat)) {
            extactedDate = filter.split('/');
            // dateObj = new Date(`${extactedDate[2]}-${extactedDate[1]}-${extactedDate[0]}`);
            ymdFormatedDate = `${extactedDate[2]}-${extactedDate[1]}-${extactedDate[0]}`;

            if (moment(ymdFormatedDate).isValid()) {
                // TO store ISO type date as like for mongoose document date Type
                // isoDate = moment(dateObj).format('YYYY-MM-DDT00:00:00.000') + 'Z';

                // isoDate = moment(dateObj, 'YYYY-MM-DD').toISOString();

                isoDate = moment(ymdFormatedDate).toISOString();
                ltIsoDate = moment(ymdFormatedDate).add(1, 'day').toISOString();

                // isoDate1 = moment(dateObj, 'DD/MM/YYYY')
                //     .utcOffset(0)
                //     .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
                //     .toISOString();

                // console.log(isoDate1);

                // isoDate = new Date(
                //     dateObj.getTime() - dateObj.getTimezoneOffset() * 60000
                // ).toISOString();

                filterParams.$or.push({
                    date: {
                        $gte: isoDate,
                        $lt: ltIsoDate,
                    },
                });
            }
        }
    }

    // var s = moment(filter, 'DD/MM/YYYY')
    //     .utcOffset(0)
    //     .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    //     .toISOString();
    // d = filter.split('/');
    // // var s = moment.utc([2010, 1 - 1, 14, 15, 25, 50, 125]);
    // v = moment.toArray([2010, 1, 14, 15, 25, 50, 125]);

    // console.log(isoDate);
    console.log(filterParams);

    try {
        const totalInvoices = invoiceModel.countDocuments(filterParams).exec();
        const searchInvoicesData = invoiceModel
            .find(filterParams)
            .sort(sortOrder)
            .skip(parseInt(offset))
            .limit(parseInt(limit))
            .exec();

        const result = Promise.all([totalInvoices, searchInvoicesData]);

        result.then(([total, invoices]) => {
            return res.json({
                status: 200,
                error: false,
                message: 'Invoice.',
                data: { total: total, invoices: invoices },
            });
        });
        // await invoiceModel
        //     .find()
        //     // .where(['item', 'quantity', 'date', 'due', 'rate'])
        //     // .in(typeof filter != 'undefined' ? filter : '')
        //     .sort(sortOrder)
        //     .skip(parseInt(offset))
        //     .limit(parseInt(limit))
        //     .then((invoice) => {
        //         invoiceModel.countDocuments();
        //         return res.json({
        //             status: 200,
        //             error: false,
        //             message: 'Invoice.',
        //             data: invoice,
        //         });
        //     });
    } catch (error) {
        return next(error);
    }
};
