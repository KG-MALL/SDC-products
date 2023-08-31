const OverviewSchema = new mongoose.Schema(
{
    "id": Number,
    "name": String,
    "slogan": String,
    "description": String,
    "category": String,
    "default_price": Number,
    "features": [
        {
        "feature": Number,
        "value": String
        }
    ],
    "styles": [
        {
        "style_id": Number,
        "name": String,
        "original_price": Number,
        "sale_price": Number || null,
        "default": Boolean,
        "photos": [
            {
            "thumbnail_url": String,
            "url": String
            }
           ],
        "skus": [
            {
            "sku_number": Number,
            "quantity": Number,
            "size": String
            }
        ]
        }
    ],
    "related_products": [
        {
            "related_product_id": Number
        }
    ]
});
