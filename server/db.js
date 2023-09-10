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


//   const redis = new Redis( {host:process.env.REDISHOST, port:6379, connectTimeout: 10000 } );
// redis.on('connect', () => {
//   console.log('Redis client is initiating a connection to the server.');
// });

// redis.on('ready', () => {
//   console.log('Redis client successfully initiated connection to the server.');
// });

// redis.on('reconnecting', () => {
//   console.log('Redis client is trying to reconnect to the server...');
// });

// redis.on('error', (err) => console.log('Redis Client Error', err));

// //check the functioning
// redis.set("framework", "AngularJS", function(err, reply) {
//   console.log("redis.set ", reply);
// });

// redis.get("framework", function(err, reply) {
//   console.log("redis.get ", reply);
// });

exports.pool = pool;
// exports.redis = redis;
