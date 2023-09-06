const {pool} = require('../db.js');

module.exports = {
  // gets one product from the database using the given product id parameter or gets all products if no product id parameter
  async getProducts(req, res) {
    // if product id query parameter is given, return the one product
    if (req.query.product_id !== undefined) {
      const product = await pool.query(
        `SELECT * FROM product
        INNER JOIN feature on feature.id_product=product.id
        WHERE product.id=${req.query.product_id}`
      );
      let productObj = {
        id: product.rows[0].id,
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
    let styleObject = {
      product_id: req.query.product_id,
      results: []
    };
    const style = await pool.query(
      `SELECT style.id as style_id, name, original_price, sale_price, default_style, photo.id as photo_id,
      thumbnail_url, url,
      sku.id as sku_id, sku.quantity as quantity, sku.size as size FROM style
      INNER JOIN photo ON photo.id_style=style.id
      INNER JOIN sku ON sku.id_style=style.id
      WHERE id_product = ${req.query.product_id}
      ORDER BY style.id ASC, photo.id ASC, sku.id ASC`
    );

    // to keep track of the style ID we are currently on
    let lastUniqueStyleID = -1;
    let lastUniquePhotoID = -1;
    let lastUniqueSKUID = -1;

    for (let i = 0; i < style.rows.length; i++) {

      // create a new object on the first unique style id
      if (lastUniqueStyleID !== style.rows[i].style_id) {
      var newObj = {
        style_id: style.rows[i].style_id,
        name: style.rows[i].name,
        original_price:  style.rows[i].original_price,
        sale_price:  style.rows[i].sale_price,
        'default?': style.rows[i].default_style,
        photos: [],
        skus: {}
      };
      lastUniqueStyleID = style.rows[i].style_id;
    }

      // if the photo id is unique, add photos to newObj
      if (lastUniquePhotoID !== style.rows[i].photo_id) {
        newObj['photos'].push({
          thumbnail_url: style.rows[i].thumbnail_url,
          url: style.rows[i].url
        });
        lastUniquePhotoID = style.rows[i].photo_id;
      }

      // if the sku id is unique, add sku data to newObj
      if (lastUniqueSKUID < style.rows[i].sku_id) {
        newObj['skus'][`${style.rows[i].sku_id}`] = {
          quantity: style.rows[i].quantity,
          size: style.rows[i].size
        };
        lastUniqueSKUID = style.rows[i].sku_id;
      }

      // if the next style id is unique, push newObj to the results
      if (i+1 < style.rows.length && lastUniqueStyleID !== style.rows[i+1].style_id) {
        styleObject['results'].push(newObj);
      }
    }
    // push the last newObj to results
    styleObject['results'].push(newObj);
    res.send(styleObject);
  } else {
    res.sendStatus(500);
  }
  },

  // gets array of related product IDs
  async getRelatedProducts(req, res) {
    if (req.query.product_id !== undefined) {
      const related = await pool.query(`SELECT related_products.related_product_id FROM product LEFT JOIN related_products ON related_products.current_product_id=product.id WHERE product.id=${req.query.product_id}`);
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