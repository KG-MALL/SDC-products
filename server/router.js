const express = require('express');
const router = express.Router();
const controller = require('./controllers');
const db = require('./db.js')

router.get('/products', controller.products.getProducts);
router.get('/products/styles', controller.products.getProductStyles);
router.get('/products/related', controller.products.getRelatedProducts);

module.exports = router;