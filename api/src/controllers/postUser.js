const { User } = require("../db");
const bcrypt = require("bcrypt");
const transporter = require("../nodemailer/nodemailer.js");
const postUser = async (user) => {
  const {
    name,
    lastName,
    email,
    password,
    address,
    phone, // applied destructurin to the user
  } = user;

  if (!name || !lastName || !email) {
    switch (
      true // handle errors individually in case a specific piece of information is missing
    ) {
      case !name:
        throw new Error("Please insert your name.");
      case !lastName:
        throw new Error("Please insert your last name.");
      case !email:
        throw new Error("Please insert your E-mail.");
      default:
        break;
    }
  } else if (!password) {
    await User.create({
      name,
      lastName,
      email,
      password,
      address,
      phone,
    });
    return "The user has been created successfully";
  } else {
    hash = await bcrypt.hash(password, 16); //encrypt the password so as not to save it in plain text
    // create an error instance to handle create error with parameters that are unique
    await User.create({
      name,
      lastName,
      email,
      password: hash,
      address,
      phone,
    });
        // await transporter.sendMail({
        //   from: '"The Whave" <pfthewhave@gmail.com>', // sender address
        //   to: email, // list of receivers
        //   subject: `usuario creado `, // Subject line
        //   html: `<p> Hola, ${name}! <p> Te informamos que acabas de publicar un producto con el nombre . Para ver la publicación, haz clic en el siguiente enlace:</p> 
        // <p>http://localhost:3000/products/${newUser.id}</p>
        // `, // html body
        // });
    return "The user has been created successfully";
  }
};

module.exports = postUser;
