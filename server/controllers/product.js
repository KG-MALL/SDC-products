const db = require('../db.js')

module.exports = {
  // gets the first product from the API host's product array
  async getProduct(req, res) {
        const item = await client.query('SELECT * FROM product WHERE id = 1');
        console.log(item);
        res.send(item);
  },
};