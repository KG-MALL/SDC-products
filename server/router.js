const express = require('express');
const router = express.Router();
const controller = require('./controllers');
const db = require('./db.js')
require('dotenv').config();

router.get('/products', controller.products.getProducts);
router.get('/products/styles', controller.products.getProductStyles);
router.get('/products/related', controller.products.getRelatedProducts);
// router.get(`/${process.env.LOADER}`, controller.products.loader);
// router.get('/products/test', controller.products.getProductsTest);
// router.get('/products/styles/test', controller.products.getStylesTest);
// router.get('/products/related/test', controller.products.getRelatedTest);

module.exports = router;