const { Router } = require("express");
//importamos
const userRouter=require('./userRouter')
const typeRouter=require('./typeRouter')
// const reviewRouter=require('./reviewRouter')
const productRouter=require('./productRouter')
// const courseRouter=require('./courseRouter')
// const brandRouter=require('./brandRouter')
const orderRouter=require('./orderRouter')
const filterRouter=require('./filterRouter')
const brandRouter=require('./brandRouter')

const router= Router();

// Rutas
router.use('/User', userRouter)
router.use('/Type', typeRouter)
// router.use('/Review', reviewRouter)
router.use('/Product',productRouter)
// router.use('/Course', courseRouter)
// router.use('/Brand', brandRouter)
router.use('/Order',orderRouter )
router.use('/Filter',filterRouter)

router.use('/Brand', brandRouter)


module.exports = router;