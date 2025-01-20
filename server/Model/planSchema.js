const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required.'
  },
  bid: {
    type: String,
    default: "0 bids"
  },
  price: {
    type: String,
   default: "0.20 Eth"
  },
  category: {
    type: String,
    enum: ['art', 'gaming', 'avatars', 'collectibles', 'music','decentraland' ,'sports', ],
    required: 'This field is required.'
  },
  description: {
    type: String,
    required: 'This field is required.'
  },
  image: {
    type: String,
  },

  status: {
    type: String,
    default: 'not sold'
  },
  bidname: {
    type: String,
  },
  amount: {
    type: Number,
  },

  bidStatus: {
    type: String,
  },

owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    // required: true
}
});

planSchema.index({ name: 'text', description: 'text' });
// WildCard Indexing
//recipeSchema.index({ "$**" : 'text' });

const  Plan = mongoose.model('plan', planSchema);
module.exports  = Plan;


// const mongoose = require('mongoose');


// const planSchema = new mongoose.Schema({

// }, {timestamps: true});
// Plan.index({ name: 'text', description: 'text' });

// const Plan  = mongoose.model('plan', planSchema);

// module.exports = Plan;