const express = require('express');
const router = express.Router();
const controller = require('./controllers');
const db = require('./db.js')

router.get('/api/product', controller.products.getProduct);
router.get('/api/product/styles', controller.overView.getProductStyles);

module.exports = router;