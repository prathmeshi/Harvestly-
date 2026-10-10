const express = require('express');
const Product = require('../models/product');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Could not load products.' });
  }
});

module.exports = router;