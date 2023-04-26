const { User, Product, Shop } = require("../db");

async function shopProduct(req, res) {
  const { userId, productId, quantity } = req.body;

  // console.log('userId:', userId);
  // console.log('productId:', productId);
  // console.log('quantity:', quantity);

  try {
    const user = await User.findByPk(userId);
    const product = await Product.findByPk(productId);
    // console.log('product:', product);
    // console.log('user:', user);

    await user.addProduct(product, {
      through: {
        model: Shop,
        shop_date: new Date(),
        quantity: quantity,
        // user_shop_id: user.id,
        // product_shop_id: product.id,
      },
    });

    res.status(200).json({ message: "Product added to user successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
}

module.exports = shopProduct;
