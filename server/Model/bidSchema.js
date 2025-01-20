


const mongoose = require('mongoose');


const bidsSchema = new mongoose.Schema({

    name: {
        type: String
    },
    amount: {
        type: Number
    },
   
    status: {
        type: String,
        default: 'pending'
    },

    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        // required: true
    }
}, {timestamps: true});

const Bids = mongoose.model('bid', bidsSchema);

module.exports = Bids;
