const mongoose = require('mongoose');
const  validator  = require('validator');
// const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    username: {
        type: String
    },
    firstname:{
        type: String,
    },
    lastname:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
        lowercase: true,
        required: validator.isEmail['Please enter an email']
        // required:  [isEmail, 'Please enter an email']
    },

    password:{
        type: String,
    },

    wallet:{
        type: String,
        default: "0x2CCD05252F71Abb0e9c215B47421ca1f8260ac82"
    },

    mintFee:{
        type: String,
        default: "0.20ETH"
    },

    currency:{
        type: String,
        default: "ETH"
    },
    balance:{
        type: Number,
        default: 0
    },

    bid:{
        type: Number,
        default: 0
    },

    bids:{
         type: [mongoose.Schema.Types.ObjectId],
        ref: 'bid'
    },
    categorys:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Category'
    },

    plans: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'plan'
    },
   
    deposits:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'deposit'
    },


    widthdraws:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'widthdraw'
    },
    role:{
        type: Number,
        default: 0
    }
},{timestamps: true})

// static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await (password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };
  

const User = mongoose.model('user', userSchema)

module.exports = User;
