require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/products');

const samples = [
  {
    name: 'Sharbati Wheat',
    category: 'grains',
    quantity: 500,
    price: 28,
    farmerName: 'Kisan FPO',
    location: 'Sehore',
  },
  {
    name: 'Bhagwa Pomegranate',
    category: 'fruits',
    quantity: 200,
    price: 110,
    farmerName: 'Solapur Agro',
    location: 'Solapur',
  },
  {
    name: 'Nashik Red Onion',
    category: 'vegetables',
    quantity: 800,
    price: 18,
    farmerName: 'Lasalgaon Co-op',
    location: 'Nashik',
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(samples);
    console.log('Sample products added');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });