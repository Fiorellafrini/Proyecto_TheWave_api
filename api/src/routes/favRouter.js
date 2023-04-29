const { Router } = require('express');
const favRouter = Router()
const {addToFavorites} = require("../controllers/fav")
const {removeFromFavorites} = require("../controllers/fav")
const {getFavorites} = require("../controllers/fav")


// agregar un producto a los fav de un usuario
favRouter.post("/:user_id/:product_id", addToFavorites);

//  eliminar un producto de los fav de un usuario
favRouter.delete("/:user_id/:product_id", removeFromFavorites);

// obtener todos los productos fav de un usuario
favRouter.get("/:user_id", getFavorites);


module.exports=favRouter