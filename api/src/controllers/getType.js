const axios = require("axios");
const { Type } = require("../db");
// const { data } = require("./data");

const getType = async () => {
  const url = "https://run.mocky.io/v3/852691f8-645b-481e-83ba-3b889345fe19";
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
