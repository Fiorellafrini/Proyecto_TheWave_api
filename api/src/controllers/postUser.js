const { User } = require("../db");
const transporter = require("../nodemailer/nodemailer.js");
const postUser = async (user) => {
  try {
    const { name, lastName, email } = user;
    if (!name || !lastName || !email) throw new Error("Missing Information");
    const newUser = await User.create({
      // const newUser= await User.findOrCreate({
      name,
      lastName,
      email,
    });
        await transporter.sendMail({
          from: '"The Whave" <pfthewhave@gmail.com>', // sender address
          to: email, // list of receivers
          subject: `usuario creado `, // Subject line
          html: `<p> Hola, ${name}! <p> Te informamos que acabas de publicar un producto con el nombre . Para ver la publicación, haz clic en el siguiente enlace:</p> 
        <p>http://localhost:3000/products/${newUser.id}</p>
        `, // html body
        });
    return newUser;
  } catch (error) {
    return error.message;
  }
};

module.exports = postUser;
