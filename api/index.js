//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const getBrands  = require("./src/controllers/getBrands.js");
const  getType = require("./src/controllers/getType.js");
const getProducts = require("./src/controllers/getProducts.js");
const {PORT} = process.env

conn.sync({ force: true }).then(async () => {
  server.listen(3001, () => {
    console.log('🚀⚡ listening on port: 3001 ⚡🚀'); // eslint-disable-line no-console
  });
  await getType();
  await getBrands();
  await getProducts();
});
