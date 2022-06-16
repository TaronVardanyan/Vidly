const mongoose = require('mongoose');

const customersSchema = new mongoose.Schema({
    isGold: { type: Boolean, default: false },
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
    },
    phone: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
    },
});

const Customer = mongoose.model("Customer", customersSchema);
module.exports = Customer;