const { Product, Type, Brand } = require("../db");
// const cloudinary = require('cloudinary').v2;


const postProducts = async (product) => {
  try {

    let { name, imagen, size, price, id_type, id_brand, description } = product;
    if (!name && !imagen && !size && !price ) {
      throw new Error("Missing Information");
    }
    id_type = parseInt(id_type);
    id_brand = parseInt(id_brand);
    
      const newProduct = await Product.create({
      name,
      imagen,
      size,
      price,
      description,
      id_type,
      id_brand,

    });

// // Subir imagen a Cloudinary
// const result = await cloudinary.uploader.upload(req.file.path);

// // Aplicar transformación de tamaño a la imagen
// const transformedUrl = cloudinary.url(result.public_id, {
//   width: 300,
//   height: 300,
//   crop: 'fill' // opcionalmente, puedes usar 'fit' en lugar de 'fill' para mantener la relación de aspecto y ajustar el tamaño dentro de los límites especificados
// });

    const types = await Type.findOne({where: {id_type: id_type}});
    const brands = await Brand.findOne({where: {id_brand:id_brand}});
    newProduct.setType(types);
    newProduct.setBrand(brands);
  return "exito al crear el producto"
  }
  catch (error) {
    return error.message;
  }

};







module.exports = postProducts;
