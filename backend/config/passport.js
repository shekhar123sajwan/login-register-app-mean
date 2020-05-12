const adminModel = require('../models/admin');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

module.exports.adminLogin = (passport) => {
    passport.use(
        new JwtStrategy(opts, function (jwt_payload, done) {
            adminModel.findById({ _id: jwt_payload._id }, function (err, user) {
                if (err) {
                    console.log('hi');
                    return done(err, false);
                }
                if (user) {
                    console.log('hsi');
                    return done(null, user);
                } else {
                    console.log('hiss');
                    return done(null, false);
                }
            });
        })
    );
};
