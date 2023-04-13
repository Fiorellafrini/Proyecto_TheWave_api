const { default: axios } = require("axios")
const {Brand} = require("../db")

const getBrands = async () => {
    const url = "https://run.mocky.io/v3/f3ebe0cb-abbc-48ea-93d3-a002747a1de7"
    try {
        const response = await axios.get(url)
        const brands = response.data
        for(const brand of brands){
            await Brand.findOrCreate({
                where: {name: brand.name}
            })
        }
        const allBrands = await Brand.findAll()
        if(!allBrands) throw new Error ("Brands not found")
        return allBrands
    } catch (error) {
        return error.message
    }
}

module.exports = getBrands