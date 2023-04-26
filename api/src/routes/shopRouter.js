const { Router } = require('express');
const shopRouter = Router()
const shopProduct = require("../controllers/shopControllers")

shopRouter.post("/", shopProduct);



module.exports = shopRouter;