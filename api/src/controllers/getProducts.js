const axios = require("axios")
const {Product} = require("../db")

const getProducts = async() => {

    const fieldId = " 1S85z4-XfT8wIfd6qVvbbOose1P0NYxC"
    const url = ""
    try {
        const products = await Product.findAll()
        if(!products) throw new Error ("Products not Found")
        return products
    } catch (error) {
        return error.message
    }
}

module.exports = getProducts