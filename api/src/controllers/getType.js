const axios = require("axios");
const { Type } = require("../db");

const getType = async () => {
  const url = "https://run.mocky.io/v3/1a1baec5-a41e-438b-be67-d52b6ed7c5a6";
  try {
    const response = await axios.get(url);
    const types = response.data;
    for (const type of types) {
      await Type.findOrCreate({
        where: { name: type.name },
      });
    }
    const allType = await Type.findAll();
    return allType;
  } catch (error) {
    return error.message;
  }
};

module.exports = getType;
