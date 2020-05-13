const Joi = require('@hapi/joi');
const moment = require('moment');
const adminModel = require('../models/admin');
const authService = require('../service/auth');
var url = require('url');
const TOKEN_EXPIREY = authService.TOKEN_EXPIREY;
const REFERESH_TOKEN_EXPIREY = moment().add(12, 'M').format();

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
                adminModel.getAdminByEmail(values.email, (err, admin) => {
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

                    adminModel.comparePassword(values.password, admin.password, (err, isMatch) => {
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
                        const token = authService.generateToken(admin.toJSON(), TOKEN_EXPIREY);
                        const refreshToken = authService.refreshToken();

                        Promise.all([token, refreshToken]).then(([token, refreshToken]) => {
                            adminAuthParams = {
                                admin_id: admin._id,
                                token: refreshToken,
                                expire: REFERESH_TOKEN_EXPIREY,
                            };

                            adminModel.AdminAuthModel.findOneAndRemove({
                                admin_id: adminAuthParams.admin_id,
                            })
                                .exec()
                                .then(() => {
                                    adminModel.AdminAuthModel.create(adminAuthParams)
                                        .then((adminAuth) => {
                                            obj.refreshToken = adminAuth.token;
                                            obj.token = token;
                                            obj.admin = admin;
                                            res.status(200);
                                            return res.json({
                                                status: 200,
                                                error: false,
                                                message: 'Admin Auth Success.',
                                                data: obj,
                                            });
                                        })
                                        .catch((err) => next(err));
                                })
                                .catch((err) => next(err));
                        });
                    });
                });
            })
            .catch((err) => next(err));
    } catch (err) {
        return next(err);
    }
};

module.exports.authToken = async (req, res, next) => {
    var queryData = url.parse(req.url, true).query;
    authService.verifyToken(queryData.accessToken.trim(), (err, adminData) => {
        if (err.name != 'TokenExpiredError') {
            res.status(400);
            return res.json({
                status: 400,
                error: true,
                message: 'Token does not match.',
                data: [],
            });
        } else {
            authService.decodeToken(queryData.accessToken.trim()).then((adminData) => {
                adminModel.AdminAuthModel.findOne({ admin_id: adminData._id })
                    .exec()
                    .then((admin) => {
                        if (new Date(moment().toISOString()) >= admin.expire) {
                            res.status(401);
                            return res.json({
                                status: 401,
                                error: false,
                                message: 'Token Expired.',
                                data: [],
                            });
                        } else {
                            delete adminData.iat;
                            delete adminData.exp;
                            authService.generateToken(adminData, TOKEN_EXPIREY).then((newToken) => {
                                res.status(200);
                                return res.json({
                                    status: 200,
                                    error: false,
                                    message: 'Token.',
                                    data: { token: newToken },
                                });
                            });
                        }
                    });
            });
        }
    });
};
