const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    MobileNumber: {

        type: String,
        required: true
    },
    Address: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }

});

module.exports = mongoose.model('User', userSchema);