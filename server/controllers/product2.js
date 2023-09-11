const {pool} = require('../db.js');
require('dotenv').config();

// this file does not use redis
module.exports = {
  // gets one product from the database using the given product id parameter or gets all products if no product id parameter
  //   loader(req, res) {
  //     res.send(`${process.env.LOADER}`);
  // },

  async getProducts(req, res) {
    // if product id query parameter is given, return the one product
    if (req.query.product_id !== undefined) {
      const product = await pool.query(
        `SELECT * FROM product
        INNER JOIN feature on feature.id_product=product.id
        WHERE product.id=${req.query.product_id}`
      );
      let productObj = {
        id: req.query.product_id,
        name: product.rows[0].name,
        slogan: product.rows[0].slogan,
        description: product.rows[0].description,
        category: product.rows[0].category,
        default_price: product.rows[0].default_price,
        features: []
      };
      for (let i = 0; i < product.rows.length; i++) {
        productObj['features'].push({
          feature: product.rows[i].feature,
          value: product.rows[i].value
        });
      }
      res.send(productObj);
      return;
    }
    // return all products based on the count and page parameters given
    // if no count parameter provided, set to 5
    if (req.query.count === undefined) {
      var count = 5;
    } else {
      var count = req.query.count;
    }
    // if no page parameter provided, set to 1
    if (req.query.page === undefined) {
      var page = 1;
    } else {
      var page = req.query.page;
    }
    // calculate the offset
    let offset = count * page - count;
    const items = await pool.query(`SELECT * FROM product ORDER BY id ASC LIMIT ${count} OFFSET ${offset}`);
    res.send(items.rows);
  },

  // gets the styles of a product from the database using the given product id query
  async getProductStyles(req, res) {
    if (req.query.product_id !== undefined) {
      let styleObject = {};
      styleObject.product_id = req.query.product_id;
      let results = [];
      const style = await pool.query(
        `SELECT id as style_id, name, original_price, sale_price, default_style as "default?"
        FROM style
        WHERE id_product = ${req.query.product_id}`
      );

      for (let i = 0; i < style.rows.length; i++) {
        let newObj = {...style.rows[i]};
        let styleId = style.rows[i].style_id;
        // add the photos for the style
        const photo = await pool.query(
          `SELECT thumbnail_url, url
          FROM style
          LEFT JOIN photo
          ON photo.id_style=style.id
          WHERE id_style = ${styleId}`
        );
        let photoArray = [];

        for (let y = 0; y < photo.rows.length; y++) {
          let photoObj = {};
          photoObj['thumbnail_url'] = photo.rows[y].thumbnail_url;
          photoObj['url'] = photo.rows[y].url;
          photoArray.push(photoObj);
        }
        newObj['photos'] = photoArray;
        // add the sku quantity and size for the style
        const sku = await pool.query(
          `SELECT sku.id, sku.quantity as quantity, sku.size as size
          FROM style
          LEFT JOIN sku
          ON sku.id_style=style.id
          WHERE id_style = ${styleId}`
        );
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
      styleObject.results = results;
      res.send(styleObject);
    } else {
      res.sendStatus(500);
    }
  },

  // gets array of related product IDs
  async getRelatedProducts(req, res) {
    if (req.query.product_id !== undefined) {
      const related = await pool.query(
        `SELECT related_products.related_product_id
        FROM product
        LEFT JOIN related_products
        ON related_products.current_product_id=product.id
        WHERE product.id=${req.query.product_id}`
      );
      let relatedIDs = [];
      for (let i = 0; i < related.rows.length; i++) {
        relatedIDs.push(related.rows[i]['related_product_id']);
      }
      res.send(relatedIDs);
    } else {
      res.sendStatus(500);
    }
  }
};