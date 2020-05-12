const Joi = require('@hapi/joi');
const userModel = require('../models/admin');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports.findAll = async (req, res, next) => {};

module.exports.login = async (req, res, next) => {
    try {
        const schema = Joi.object({
            email: Joi.string().required().trim().email(),
            password: Joi.string().required().trim(),
        });

        schema
            .validateAsync(req.body)
            .then((values) => {
                userModel.getAdminByEmail(values.email, (err, admin) => {
                    if (err) next(err);
                    if (!admin) {
                        res.status(404);
                        return res.json({
                            status: 404,
                            error: false,
                            message: 'Email Not Found.',
                            data: [],
                        });
                    }

                    userModel.comparePassword(values.password, admin.password, (err, isMatch) => {
                        if (err) next(err);
                        if (!isMatch) {
                            res.status(401);
                            return res.json({
                                status: 401,
                                error: false,
                                message: 'Password does not match.',
                                data: [],
                            });
                        }
                        const obj = {};
                        const token = jwt.sign(admin.toJSON(), process.env.SECRET, {
                            expiresIn: '24h',
                        });

                        console.log(req.session);
                        obj.token = `bearer ${token}`;
                        obj.admin = admin;
                        res.status(200);
                        return res.json({
                            status: 200,
                            error: false,
                            message: 'Admin Auth Success.',
                            data: obj,
                        });
                    });
                });
            })
            .catch((err) => next(err));
    } catch (err) {
        return next(err);
    }
};
