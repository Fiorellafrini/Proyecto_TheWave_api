const { Router } = require("express");
//importamos
const userRouter = require("./userRouter");
const typeRouter = require("./typeRouter");
// const reviewRouter=require('./reviewRouter')
const productRouter = require("./productRouter");
// const courseRouter=require('./courseRouter')
const orderRouter = require("./orderRouter");
const filterRouter = require("./filterRouter");
const brandRouter = require("./brandRouter");
const authRouter = require("./authRouter");
const paymentsRouter = require("./PaymentRouter");

const router = Router();

// Rutas
router.use("/user", userRouter);
router.use("/type", typeRouter);
// router.use('/Review', reviewRouter)
router.use("/product", productRouter);
// router.use('/Course', courseRouter)
router.use("/order", orderRouter);
router.use("/filter", filterRouter);
// router.use("/auth", authRouter);
router.use("/brand", brandRouter);
//mercadoPago
router.use("/payment", paymentsRouter);

module.exports = router;
