DROP TABLE IF EXISTS product, feature, style, photo, sku, related_products CASCADE;

CREATE TABLE product (
  id SERIAL NOT NULL,
  name VARCHAR(32) NOT NULL,
  slogan TEXT NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(32) NOT NULL,
  default_price  DECIMAL NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE feature (
  id SERIAL NOT NULL,
  id_product INTEGER NOT NULL,
  feature VARCHAR(32) NOT NULL,
  value VARCHAR(32) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE style (
  id SERIAL NOT NULL,
  id_product INTEGER NOT NULL,
  name VARCHAR(64) NOT NULL,
  sale_price DECIMAL NULL DEFAULT NULL,
  original_price DECIMAL NOT NULL,
  default_style BOOLEAN NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE photo (
  id SERIAL NOT NULL,
  id_style INTEGER NOT NULL,
  thumbnail_url TEXT NOT NULL,
  url TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE sku (
  id SERIAL NOT NULL,
  id_style INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  size VARCHAR(8) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE related_products (
  current_product_id INTEGER NOT NULL,
  related_product_id INTEGER NOT NULL
);

ALTER TABLE feature ADD FOREIGN KEY (id_product) REFERENCES product (id);
ALTER TABLE style ADD FOREIGN KEY (id_product) REFERENCES product (id);
ALTER TABLE photo ADD FOREIGN KEY (id_style) REFERENCES style (id);
ALTER TABLE sku ADD FOREIGN KEY (id_style) REFERENCES style (id);
ALTER TABLE related_products ADD FOREIGN KEY (current_product_id) REFERENCES product (id);

CREATE INDEX idx_id ON product(id);
CREATE INDEX idx_id_productf ON feature(id_product);
CREATE INDEX idx_id_product ON style(id_product);
CREATE INDEX idx_id_productp ON photo(id_style);
CREATE INDEX idx_id_products ON sku(id_style);
CREATE INDEX idx_current_product_id ON related_products(current_product_id);