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
/* const { property } = require("./src/controller/controllerProperty");
const { typeDb } = require("./src/controller/controllerType");
const { servicioDb } = require("./src/controller/controlerServicios"); */

// Syncing all the models at once.
conn.sync({ alter: true }).then(async () => {
    server.listen(3001, () => {
        console.log("Api listening on http://localhost:3001"); // eslint-disable-line no-console
    });
    /*  await typeDb();
    await servicioDb();
  await property(); */
});