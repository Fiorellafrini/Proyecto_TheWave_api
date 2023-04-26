const { Router } = require('express');
const shopRouter = Router()
const {shopProduct} = require("../controllers/Shop");
const {getAllShop} = require("../controllers/Shop")

shopRouter.post("/", shopProduct);
shopRouter.get("/", getAllShop);




module.exports = shopRouter;