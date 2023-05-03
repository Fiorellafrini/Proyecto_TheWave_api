const { Router } = require("express");
const shopRouter = Router();
const {
  createShopDetail,
  getShopDetails,
} = require("../controllers/ShopDetail");

shopRouter.post("/", createShopDetail);
shopRouter.get("/", getShopDetails);

module.exports = shopRouter;
