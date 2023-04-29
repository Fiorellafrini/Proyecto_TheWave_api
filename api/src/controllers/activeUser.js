const { User } = require ("../db");



const updateUserActive = async (id, active) => {
  try {
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      throw new Error("User not found");
    }
    await User.update({ active: active }, { where: { id: id } });
    const userList = await User.findAll();
    return userList;
  } catch (error) {
    throw new Error(error.message);
  }
};
 

  
  
  

module.exports = { updateUserActive };