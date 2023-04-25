const { User } = require ("../db");

const updateUserActive= async (id, active) => {
  try {
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      throw new Error("User not found");
    }
    await Product.update({ active: active }, { where: { id: id } });
    const updatedUser = await Product.findOne({ where: { id: id } });
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = updateUserActive;