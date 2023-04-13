const {Brand} = require("../db")

const getBrands = async () => {
    try {
        const brands = await Brand.findAll()
        if(!brands) throw new Error ("Brands not found")
        return brands
    } catch (error) {
        return error.message
    }
}

module.exports = getBrands