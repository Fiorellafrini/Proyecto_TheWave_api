const { User} = require("../db");


const getAllUser = async () => {
    try {
      const users = await User.findAll({ where: { active: true } });
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  module.exports = getAllUser;
  
