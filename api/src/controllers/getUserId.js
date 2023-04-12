const { User } = require("../db");

const getUserId = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not Found");
    return user;
  } catch (error) {
    return error.message;
  }
};

module.exports = getUserId;
