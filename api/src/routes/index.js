const { Router } = require("express");
//importamos
const userRouter = require("./userRouter");
const typeRouter = require("./typeRouter");
const reviewRouter = require("./reviewRouter");
const productRouter = require("./productRouter");
// const courseRouter=require('./courseRouter')
const orderRouter = require("./orderRouter");
const filterRouter = require("./filterRouter");
const brandRouter = require("./brandRouter");
const authRouter = require("./authRouter");
const paymentsRouter = require("./PaymentRouter");
const passwordRouter = require("./passwordRouter");
const shopRouter = require("./shopRouter");
const shopDetailRouter = require("./shopDetailRouter");
const favRouter = require("./favRouter")

const router = Router();

// Rutas
router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/review", reviewRouter);
router.use("/product", productRouter);
// router.use('/Course', courseRouter)
router.use("/order", orderRouter);
router.use("/filter", filterRouter);
router.use("/auth", authRouter);
router.use("/brand", brandRouter);
router.use("/shop", shopRouter);
router.use("/shop_detail", shopDetailRouter);
router.use("/favorites", favRouter);


//mercadoPago
router.use("/password", passwordRouter);
router.use("/payment", paymentsRouter);

module.exports = router;
