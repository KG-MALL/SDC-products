const express = require('express');
const router = express.Router();
const controller = require('./controllers');
const db = require('./db.js')

router.get('/api/product', controller.products.getProduct);


module.exports = router;