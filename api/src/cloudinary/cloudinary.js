const cloudinary = require('cloudinary').v2;
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;
const { Product } = require('../db')

// Configuration 
cloudinary.config({
  cloud_name: "djngalumm",
  api_key: "897654326791657",
  api_secret:"UfU4nbhH4-ud3S3bYVrv-U4lICo"
});



// Upload

// const res = cloudinary.uploader.upload('https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg', {public_id: "olympic_flag"})

// res.then((data) => {
//   console.log(data);
//   console.log(data.secure_url);
// }).catch((err) => {
//   console.log(err);
// });




 // Reemplaza esta importación con la ruta correcta a tu modelo Product

// async function uploadImages(req, res) {s
//   try {
//     // Sube la imagen a Cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path, { folder: "images" });
    
//     // Si la subida fue exitosa, guarda la URL de la imagen en la base de datos
//     const imageUrl = result.secure_url;
    
//     // Crea un nuevo registro en la base de datos con la URL de la imagen
//     const newProduct = await Product.create({ 
//       name: req.body.name, 
//       description: req.body.description,
//       imagen: imageUrl, // Aquí guardamos la URL de la imagen en el campo imagen del modelo Product
//       size: req.body.size,
//       price: req.body.price,
//       active: req.body.active
//     });
    
//     // Envía una respuesta con el nuevo producto creado
//     res.status(200).json(newProduct);
//   } catch (error) {
//     console.error(error);
//     res.status(400).send('Error al subir imagen a Cloudinary');
//   }
// };
module.exports = { uploadImages };


