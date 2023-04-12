const { User } = require("../db");

const postUser = async (user) => {
  try {
    const { name, lastName, email } = user;
    if (!name || !lastName || !email) throw new Error("Missing Information");
    const newUser = await User.create({
      name,
      lastName,
      email,
    });
    return newUser;
  } catch (error) {
    return error.message;
  }
};

module.exports = postUser;
