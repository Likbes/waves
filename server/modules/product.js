const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: 1,
    maxlength: 100,
  },
  description: {
    type: String,
    require: true,
    maxlength: 3000,
  },
  price: {
    type: Number,
    require: true,
    maxlength: 255,
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
    reqiured: true,
  },
  shipping: {
    type: Boolean,
    reqiured: true,
  },
  available: {
    type: Boolean,
    reqiured: true,
  },
  wood: {
    type: Schema.Types.ObjectId,
    ref: 'Wood',
    reqiured: true,
  },
  frets: {
    type: Number,
    reqiured: true,
  },
  sold: {
    type: Number,
    reqiured: true,
    maxlength: 100,
    default: 0,
  },
  publish: {
    type: Boolean,
    required: true,
  },
  images: {
    type: Array,
    default: [],
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = { Product };
