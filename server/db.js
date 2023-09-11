const { Pool } = require("pg");
const Redis = require('ioredis');
const dotenv = require("dotenv");
dotenv.config();

        const pool = new Pool({
            user: process.env.USER,
            host: process.env.HOST,
            database: process.env.DATABASE,
            password: process.env.PASSWORD,
            port: 5432
        });
        pool.connect();


// const redis = new Redis( {host:process.env.REDISHOST, port:6379, connectTimeout: 10000 } );
// redis.on('connect', () => {
//   console.log('Redis client is connecting.');
// });

// redis.on('ready', () => {
//   console.log('Redis client is connected.');
// });

// redis.on('reconnecting', () => {
//   console.log('Redis client is reconnecting.');
// });

// redis.on('error', (err) => console.log('Redis client has error', err));

exports.pool = pool;
// exports.redis = redis;
