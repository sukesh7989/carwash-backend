const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword :{
        type: String,
        required: true
    }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;