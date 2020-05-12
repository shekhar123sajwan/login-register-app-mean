const app = require('express');
const router = app.Router();

// const passport = require('passport');
// const passportStrategy = require('../config/passport');
// passportStrategy.adminLogin(passport);

// router.use(
//     '/invoices',
//     passport.authenticate('jwt', {
//         session: false,
//     }),
//     require('./invoice')
// );

router.use('/invoices', require('./invoice'));
router.use('/', require('./admin'));

module.exports = router;
