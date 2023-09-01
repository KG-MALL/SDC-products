require("dotenv").config();
const express = require("express");
const router = require('./router.js');
const path = require("path");

const app = express();
app.use(express.json());
app.use('/', router);

app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);