const {pool, redis} = require('../db.js');
require('dotenv').config();

// this file uses redis for caching
module.exports = {
  // loader(req, res) {
  //   res.send(`${process.env.LOADER}`);
  // },

  // gets one product from the database using the given product id parameter or gets all products if no product id parameter
  async getProducts(req, res) {
  // if product id query parameter is given, return the one product
  if (req.query.product_id !== undefined) {
          // see if data is in Redis cache
  redis.get(req.query.product_id, async function(err, reply) {
        if (reply !== null) {
                res.send(JSON.parse(reply));
        } else {
          // it's not in cache, continue with db query
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
          // add productObj to redis cache
          redis.set(req.query.product_id, JSON.stringify(productObj), (err, reply) => {
                  if (err) {
                          console.log(err);
          } else {
                  console.log(reply);
                  res.send(productObj);
          }});
        }
      })
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
      var styleKey = `Style${req.query.product_id}`;
      // see if data is in Redis cache
      redis.get(styleKey, async function(err, reply) {
        if (reply !== null) {
                res.send(JSON.parse(reply));

        } else {
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
              FROM style LEFT JOIN sku
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
          // add styleObject to redis cache
          redis.set(styleKey, JSON.stringify(styleObject), (err, reply) => {
          if (err) {
                  console.log(err);
          } else {
            console.log(reply);
            res.send(styleObject);
          }});
        }
      });
    } else {
      res.sendStatus(500);
    }
  },

  // gets array of related product IDs
  async getRelatedProducts(req, res) {
    if (req.query.product_id !== undefined) {
      var relatedKey = `Related${req.query.product_id}`;
      // see if data is in Redis cache
      redis.get(relatedKey, async function(err, reply) {
        if (reply !== null) {
                res.send(JSON.parse(reply));
        } else {
          const related = await pool.query(
            `SELECT related_products.related_product_id
            FROM product
            LEFT JOIN related_products ON related_products.current_product_id=product.id
            WHERE product.id=${req.query.product_id}`
          );
          let relatedIDs = [];
          for (let i = 0; i < related.rows.length; i++) {
            relatedIDs.push(related.rows[i]['related_product_id']);
          }
          // add styleObject to redis cache
          redis.set(relatedKey, JSON.stringify(relatedIDs), (err, reply) => {
            if (err) {
                    console.log(err);
            } else {
            console.log(reply);
            res.send(relatedIDs);
          }});
        }
      });
    } else {
      res.sendStatus(500);
    }
  },

  // to test different endpoints due to limitations of loader.io free tier
  async getProductsTest(req, res) {
    // if product id query parameter is given, return the one product
    if (req.query.product_id !== undefined) {
      const min = 900010;
      const max = 1000011;
      const randProduct = Math.floor(Math.random() * (max - min + 1) + min);
      // see if data is in Redis cache
      redis.get(randProduct, async function(err, reply) {
        if (reply !== null) {
              res.send(JSON.parse(reply));
        } else {
          // it's not in cache, continue with db query
          const product = await pool.query(
            `SELECT * FROM product
            INNER JOIN feature on feature.id_product=product.id
            WHERE product.id=${randProduct}`
          );
          let productObj = {
            id: randProduct,
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
          // add productObj to redis cache
          redis.set(randProduct, JSON.stringify(productObj), (err, reply) => {
            if (err) {
                    console.log(err);
            } else {
              console.log(reply);
              res.send(productObj);
            }});
          }
      })
      return;
    } else {
      res.sendStatus(500);
    }
  },
  // to test different endpoints due to limitations of loader.io free tier
  async getStylesTest(req, res) {
   if (req.query.product_id !== undefined) {
    const min = 900010;
    const max = 1000011;
    const randProduct = Math.floor(Math.random() * (max - min + 1) + min);
    var styleKey = `Style${randProduct}`;
    // see if data is in Redis cache
    redis.get(styleKey, async function(err, reply) {
      if (reply !== null) {
              res.send(JSON.parse(reply));
      } else {
        let styleObject = {};
        styleObject.product_id = randProduct;
        let results = [];
        const style = await pool.query(
          `SELECT id as style_id, name, original_price, sale_price, default_style as "default?"
          FROM style
          WHERE id_product = ${randProduct}`
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
        // add styleObject to redis cache
        redis.set(styleKey, JSON.stringify(styleObject), (err, reply) => {
          if (err) {
            console.log(err);
          } else {
            console.log(reply);
            res.send(styleObject);
          }
        });
      }});
    } else {
      res.sendStatus(500);
    }
  },
  // to test different endpoints due to limitations of loader.io free tier
  async getRelatedTest(req, res) {
    if (req.query.product_id !== undefined) {
      // last 10% of related product endpoints
      const min = 209383;
      const max = 232648;
      const randProduct = Math.floor(Math.random() * (max - min + 1) + min);
      var relatedKey = `Related${randProduct}`
      // see if data is in Redis cache
      redis.get(relatedKey, async function(err, reply) {
        if (reply !== null) {
          res.send(JSON.parse(reply));
        } else {
          const related = await pool.query(
            `SELECT related_products.related_product_id
            FROM product
            LEFT JOIN related_products
            ON related_products.current_product_id=product.id
            WHERE product.id=${randProduct}`
          );
          let relatedIDs = [];
          for (let i = 0; i < related.rows.length; i++) {
            relatedIDs.push(related.rows[i]['related_product_id']);
          }
        // add styleObject to redis cache
        redis.set(relatedKey, JSON.stringify(relatedIDs), (err, reply) => {
          if (err) {
                  console.log(err);
          } else {
          console.log(reply);
          res.send(relatedIDs);
          }
        });
      }});
    } else {
      res.sendStatus(500);
    }
  },
};