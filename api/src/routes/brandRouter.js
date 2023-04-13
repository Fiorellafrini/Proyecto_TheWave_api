const { Router } = require('express');
const brandRouter = Router()
const getBrands = require("../controllers/getBrands")

brandRouter.get("/", async(req, res) => {
    try {
        const brands = await getBrands()
        res.status(200).json(brands)
    } catch (error) {
        return res.status(404).send(error)
    }
})



module.exports = brandRouter;