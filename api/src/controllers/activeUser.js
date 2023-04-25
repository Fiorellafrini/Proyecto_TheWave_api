const { User } = require ("../db");



// const updateUserStatus = async (id, status) => {
//   try {
//     const user = await User.findOne({ where: { id: id } });
//     if (!user) {
//       throw new Error("User not found");
//     }
//     await User.update({ active: status }, { where: { id: id } });
//     const updatedUser = await User.findOne({ where: { id: id } });
//     return updatedUser;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// const updateUserActive= async (id, active) => {
//   try {
//     const user = await User.findOne({ where: { id: id } });
//     if (!user) {
//       throw new Error("User not found");
//     }
//     await User.update({ active: active }, { where: { id: id } });
//     const updatedUser = await User.findOne({ where: { id: id } });
//     return updatedUser;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };
const updateUserActive = async (id, active) => {
    try {
      const user = await User.findOne({ where: { id: id } });
      if (!user) {
        throw new Error("User not found");
      }
      await User.update({ active: active }, { where: { id: id } });
      const updatedUser = await User.findOne({ where: { id: id } });
      return updatedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  };  
//   const toggleUserActive = async (req, res) => {
//     const { id } = req.params;
//     const { active } = req.body;
//     try {
//       const user = await User.findOne({ where: { id: id } });
//       if (!user) {
//         return res.status(404).send({ error: "User not found" });
//       }
//       const updatedUser = await updateUserActive(id, active);
//       res.status(200).json(updatedUser);
//     } catch (error) {
//       res.status(500).send({ error: error.message });
//     }
//   };
  
  
  

module.exports = { updateUserActive };