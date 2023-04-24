const { Router } = require("express");
const paymentsRouter = Router();
const mercadopago = require("mercadopago");

paymentsRouter.post("/", (req, res) => {
  const products = Array.isArray(req.body) ? req.body : [req.body];
  let preference = {
    items: products.map((product) => ({
      id: product.id,
      title: product.name,
      current_id: "ARS",
      picture_url: product.imagen[0],
      description: product.description,
      category_id: "art",
      quantity: product.quantity,
      unit_price: product.price,
    })),
    back_urls: {
      success: "https://proyecto-the-wave-client-1kip.vercel.app/SectionHome",
      failure: "https://proyecto-the-wave-client-1kip.vercel.app/SectionHome",
      pending: "",
    },
    auto_return: "approved",
    binary_mode: true,
  };
  mercadopago.preferences
    .create(preference)
    .then((response) => res.status(200).send({ response }))
    .catch((error) => res.status(400).send({ error: error.message }));
});

module.exports = paymentsRouter;
