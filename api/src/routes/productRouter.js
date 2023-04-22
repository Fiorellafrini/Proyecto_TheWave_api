const { Router } = require("express");
const productRouter = Router();
const { Product } = require("../db");
const getProductId = require("../controllers/getProductId");
const getProducts = require("../controllers/getProducts");
const postProducts = require("../controllers/postProducts");
const byName = require("../controllers/productByName");
const upDateActive = require("../controllers/putProduct");

//////////////////////////////////////// GET PRODUCT ID ///////////////////////////////////////////////////

productRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const productId = await getProductId(id);
    res.status(200).json(productId);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

///////////////////////////////////////// GET PRODUCTS ///////////////////////////////////////////////////

// productRouter.get("/", async (req, res) => {
//   try {
//     const { name, page = 0, size = 5, sort } = req.query; // Obtén el valor del parámetro de ordenamiento "sort" de la URL

//     if (page && size) {
//       let options = {
//         limit: +size,
//         offset: +page * +size,
//       };

//       const { count, rows } = await Product.findAndCountAll(options);

//       return res.json({
//         total: count,
//         products: rows,
//       });
//     }

//     let getAllProducts;
//     if (sort) {
//       // Si se proporciona el parámetro de ordenamiento "sort", utiliza la función getProducts con el valor de sort
//       getAllProducts = await getProducts(sort);
//     } else {
//       // Si no se proporciona el parámetro de ordenamiento, utiliza la función getProducts sin ningún parámetro
//       getAllProducts = await getProducts();
//     }

//     if (name) {
//       const products = await byName(name);
//       if (products) return res.status(200).json(products);
//     }

//     res.status(200).json(getAllProducts);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });
productRouter.get("/", async (req, res) => {
  // http://localhost:3001/product?sort=priceDesc&type=1&nameDesc(con esto hacen las combinaciones como quieren en el insomnia)
  // http://localhost:3001/product?sort=priceAsc&brand=1
  try {
    const { name, page = 0, size = 5, sort, type, brand } = req.query; //  parámetros de la URL

    if (page && size) {
      let options = {
        limit: +size,
        offset: +page * +size,
      };

      const { count, rows } = await Product.findAndCountAll(options);

      return res.json({
        total: count,
        products: rows,
      });
    }

    let getAllProducts;
    if (sort) {
      // Si se proporciona el parámetro de ordenamiento "sort", utiliza la función getProducts con el valor de sort
      getAllProducts = await getProducts(sort);
    } else {
      // Si no se proporciona el parámetro de ordenamiento, utiliza la función getProducts sin ningún parámetro
      getAllProducts = await getProducts();
    }

    if (name) {
      const products = await byName(name);
      if (products) return res.status(200).json(products);
    }

    // Construye el objeto de filtros para aplicar en la función getProducts
    const filters = {};
    if (type) {
      filters.type = type;
    }
    if (brand) {
      filters.brand = brand;
    }

    // Aplica los filtros en la función getProducts y obtiene los productos filtrados
    const filteredProducts = await getProducts(sort, filters);

    res.status(200).json(filteredProducts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

////////////////////////////////////////////// BY NAME ////////////////////////////////////////////////

// productRouter.get("/", async (req, res) => {
// const { name } = req.query;
// console.log("Name value:", name);
// try {
// const products = await byName(name);
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(404).send({ error: error.message });
//   }
// });

////////////////////////////////////////// POST PRODUCTS /////////////////////////////////////////////////

productRouter.post("/", async (req, res) => {
  try {
    const postProduct = await postProducts(req.body);
    // if (!postProduct) throw Error("product not found");
        await transporter.sendMail({
          from: "The Wave 🏄 <pfthewhave@gmail.com>", // sender address
          to: , // list of receivers   // falta relacionar el usuario para poder sacar el crreo donde se enviara la notificacion
          subject: "Product created✔", // Subject line
          html: `<p>We wanted to let you know that you have just published a new product on our platform. ${req.body.name}We are excited to have new products in our catalog and we are sure our users will be too.
Remember that to make sure your product gets maximum visibility, it's important that you include all relevant information, such as a detailed product description, high quality photos and technical specifications, if applicable.
If you need help optimizing your product listing or have any questions or concerns, please don't hesitate to contact us. We are here to help you in any way we can.
Thank you for being part of our community and for contributing to making our platform an exciting and diverse place to shop online!
Sincerely,
The Wave Team

Translated with www.DeepL.com/Translator (free version)
      </p><a href="https://proyecto-the-wave-client-1kip.vercel.app/SectionHome">Nuestro link</a>

`, // html body
        });
    res.status(201).json(postProduct);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

//////////////////////////////////////////////// PUT ACTIVE PRODUCT /////////////////////////////////////////////////

productRouter.put("/:id/", async (req, res) => {
  const id = req.params.id;
  const { name, imagen, size, price, active, id_type, id_brand } = req.body;

  try {
    const product = await upDateActive(id, {
      name,
      imagen,
      size,
      price,
      active,
      id_type,
      id_brand
    });
    if (product) return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

///////////////////////////////////////// DELETE ////////////////////////////////////////////////

productRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduct = await Product.findByPk(id);
    deleteProduct.destroy();
    res.status(200).json(deleteProduct);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

module.exports = productRouter;
