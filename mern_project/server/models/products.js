const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['grains', 'fruits', 'vegetables', 'other'],
      default: 'other',
    },
    quantity: { type: Number, required: true },
    unit: { type: String, default: 'kg' },
    price: { type: Number, required: true },
    farmerName: { type: String, default: '' },
    location: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    harvestedOn: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);