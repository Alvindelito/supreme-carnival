const mongoose = require('mongoose');

const grocerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  isComplete: Boolean,
});

const Grocery = mongoose.model('grocery', grocerySchema);

module.exports = Grocery;
