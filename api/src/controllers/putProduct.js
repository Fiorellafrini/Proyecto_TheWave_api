const { Product } = require("../db");



     const upDateActive = async (id, body) => {
         const { name, imagen, size, price, description, id_type, id_brand } = body;

      
         try {
           
             const product = await Product.findOne({ where: { id } });
        
            
             if (product) {
               // await product.update({ name, imagen, size, price,description, active: body.active });
               await product.update({ name, imagen, size, price,id_type, id_brand,description, active: body.active });
               return product;
             } else {
                 throw new Error('The specified product was not found');
             }
          } catch (error) {
             console.log(error);
            throw new Error('There was an error updating the product');
          }
         }

         module.exports =  upDateActive;
//         const upDateActive = async (id, body) => {
//           const { name, imagen, size, price, description, id_type, id_brand } = body;
        
//           try {
//             const product = await Product.findBypk(id);
        
//             if (product) {
//               // await product.update({ name, imagen, size, price,description, active: body.active });
//               await product.update({
//                 name,
//                 imagen,
//                 size,
//                 price,
//                 id_type,
//                 id_brand,
//                 description,
//                 // active: body.active,
//               });
//               return product;
//             } else {
//               throw new Error("The specified product was not found");
//             }
//           } catch (error) {
//             console.log(error);
//             throw new Error("There was an error updating the product");
//           }
//         };


    
// const { Product } = require("../db");

// const  upDateActive = async (id, body) => {
//   const product = await Product.findByPk(id);
//   if (!product) {
//     throw new Error(`product id not found ${id}`);
//   }
//   await product.set(body); 
//   await product.save();
//   return product;
// };
   




//     const { Product } = require("../db");

// const upDateActive = async (id, body) => {
//   const product = await Product.findByPk(id);
//   if (!product) {
//     throw new Error(`product id not found ${id}`);
//   }
//   await Product.update(body, { where: { id } }); 
//   const updatedProduct = await Product.findByPk(id); 
//   return updatedProduct;
// };
