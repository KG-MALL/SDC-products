const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const connectDb = async () => {
    try {
        const client = new Client({
            user: process.env.USER,
            host: process.env.HOST,
            database: process.env.DATABASE,
            password: process.env.PASSWORD,
            port: 5432
        });

        await client.connect();
        // const res = await client.query('SELECT * FROM related_products');
        // console.log(res);
        await client.end();
    } catch (error) {
        console.log(error);
    };
};

connectDb();