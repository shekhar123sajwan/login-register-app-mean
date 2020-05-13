const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const AdminSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
    {
        versionKey: false,
    }
);

// const UserSchema = new Schema(
//     {
//         name: {
//             type: String,
//             required: true,
//         },
//         email: {
//             type: String,
//             required: true,
//         },
//         password: {
//             type: String,
//             required: true,
//         },
//         permission: {
//             type: String,
//             get: function (permission) {
//                 try {
//                     return JSON.parse(permission);
//                 } catch (err) {
//                     return permission;
//                 }
//             },
//             set: function (permission) {
//                 return JSON.stringify(permission);
//             },
//         },
//     },
//     {
//         timestamps: true,
//     },
//     {
//         versionKey: false,
//     }
// );

//const UserModel = new mongoose.model('User', UserSchema);

const AdminModel = new mongoose.model('Admin', AdminSchema);
const AdminAuthSchema = new Schema(
    {
        admin_id: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
        token: {
            type: String,
            required: true,
        },
        expire: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: false,
    },
    {
        versionKey: false,
    }
);

const AdminAuthModel = new mongoose.model('Adminauth', AdminAuthSchema);

module.exports = { AdminModel, AdminAuthModel };

module.exports.getAdminByEmail = (email, callback) => {
    query = {
        email: email,
    };
    AdminModel.findOne(query, callback);
};

module.exports.findById = (query, callback) => {
    admin = AdminModel.findOne(query);
    callback(null, admin);
};

module.exports.comparePassword = (password, hash, callback) => {
    bcrypt.compare(password, hash, function (err, isMatch) {
        if (err) next(err);
        callback(null, isMatch);
    });
};
