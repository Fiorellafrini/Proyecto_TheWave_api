const { Router } = require('express');
const shopRouter = Router()
const getShopDetail = require('../controllers/ShopDetail');

shopRouter.post("/", getShopDetail);



module.exports = shopRouter;