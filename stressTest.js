import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1s', target: 1200 },
    { duration: '29s', target: 1200 },
  ],
};

// get request to product endpoint
export default function () {
  // get a random product in the last 10% of the product table
  const min = 900010;
  const max = 1000011;
  const randProduct = Math.floor(Math.random() * (max - min + 1) + min);
  http.get(`http://localhost:3002/products?product_id=${randProduct}`);
  sleep(1);
}

// get request to styles endpoint
// export default function () {
//   const min = 900010;
//   const max = 1000011;
//   const randProduct = Math.floor(Math.random() * (max - min + 1) + min);
//   http.get(`http://localhost:3002/products/styles?product_id=${randProduct}`);
//   sleep(1);
// }

// get request to related products endpoint
// export default function () {
//   const min = 900010;
//   const max = 1000011;
//   const randProduct = Math.floor(Math.random() * (max - min + 1) + min);
//   http.get(`http://localhost:3002/products/related?product_id=${randProduct}`);
//   sleep(1);
// }

