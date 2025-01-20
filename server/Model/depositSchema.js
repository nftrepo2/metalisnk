
const mongoose = require('mongoose');


const depositSchema = new mongoose.Schema({
    amount: {
        type: Number
    },
   
    status: {
        type: String,
        default: 'pending'
    },

    image:{
        type: String,
        // required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        // required: true
    }
}, {timestamps: true});

const Deposit = mongoose.model('deposit', depositSchema);

module.exports = Deposit;
