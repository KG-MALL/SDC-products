const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

        const client = new Client({
            user: process.env.USER,
            host: process.env.HOST,
            database: process.env.DATABASE,
            password: process.env.PASSWORD,
            port: 5432
        });
        client.connect();

exports.client = client;