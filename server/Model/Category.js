const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required.'
  },
  image: {
    type: String,
    required: 'This field is required.'
  },
   owner:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
          // required: true
      }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;