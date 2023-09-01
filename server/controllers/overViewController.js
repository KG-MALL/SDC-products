const {client} = require('../db.js');

module.exports = {
  // gets the first product from the API host's product array
  async getProductStyles(req, res) {
    var returnObject = {};
    returnObject.product_id = req.query.currentProductID;
    var results = [];
    const style = await client.query(`SELECT id as style_id, name, original_price, sale_price, default_style as "default?" FROM style WHERE id_product = ${req.query.currentProductID}`);

    for (let i = 0; i < style.rows.length; i++) {
      let newObj = {...style.rows[i]};
      let styleId = style.rows[i].style_id;
      const photo = await client.query(`SELECT thumbnail_url, url FROM style LEFT JOIN photo ON photo.id_style=style.id WHERE id_style = ${styleId}`);
      let photoArray = [];
      for (let y = 0; y < photo.rows.length; y++) {
        photoArray.push(photo.rows[y]);
      }
      newObj['photos'] = photoArray;


      const sku = await client.query(`SELECT sku.id, sku.quantity as quantity, sku.size as size FROM style LEFT JOIN sku ON sku.id_style=style.id WHERE id_style = ${styleId}`);

      newObj['skus'] = {};
      let skuObj = {};
      for (let z = 0; z < sku.rows.length; z++) {
        skuObj[`${sku.rows[z].id}`] = {
          quantity: sku.rows[z].quantity,
          size: sku.rows[z].size
      };
      newObj['skus'] = {...skuObj};
      }
      results.push(newObj);
    }
    returnObject.results = results;
    res.send(returnObject);
  },
};