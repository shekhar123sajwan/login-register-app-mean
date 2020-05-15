const jwt = require('jsonwebtoken');
const crypto = require('crypto');
//const jwt = require('express-jwt');
const TOKEN_EXPIREY = '2m';

var token = (data, token_expire) => {
    return new Promise((resolve, reject) => {
        const token = jwt.sign(data, process.env.SECRET, {
            expiresIn: token_expire,
        });
        if (token) {
            return resolve(token);
        }
        return reject(false);
    });
};

var refreshToken = () => {
    return new Promise((resolve, reject) => {
        const refreshToken = crypto.randomBytes(64).toString('hex');

        if (refreshToken) {
            return resolve(refreshToken);
        }
        return reject(false);
    });
};

var handleAuthorization = async (req, res, next) => {
    accesstoken = null;
    if (req.headers.authorization && req.headers.authorization != '') {
        accesstoken = req.headers.authorization;
    }

    verifyToken(accesstoken, (err, data) => {
        if (!err) {
            next();
        } else {
            err.status = 401;
            next(err);
        }
    });
};

var decodeToken = (accesstoken) => {
    return new Promise((resolve, reject) => {
        var decoded = jwt.decode(accesstoken);
        return resolve(decoded);
    });
};

var verifyToken = (accesstoken, callback) => {
    jwt.verify(accesstoken, process.env.SECRET, function (err, decoded) {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, decoded);
        }
    });
};
module.exports = {
    generateToken: token,
    refreshToken: refreshToken,
    handleAuthorization: handleAuthorization,
    TOKEN_EXPIREY: TOKEN_EXPIREY,
    decodeToken: decodeToken,
    verifyToken: verifyToken,
};
