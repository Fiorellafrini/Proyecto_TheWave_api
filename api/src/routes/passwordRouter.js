const { Router } = require("express");
const { User } = require("../db.js");
const {transporter} = require("../nodemailer/nodemailer.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = Router();
const { JWT_SECRET_KEY } = process.env;

router.post("/forgot", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if(!user) return res.status(404).send("this user is not exist in database")

  //make sure user exist in database
  if (email !== user.dataValues.email) {
    res.send("this user is  not registered");
    return;
  }
  const secret = JWT_SECRET_KEY + user.dataValues.password;
  const payload = {
    email: user.dataValues.email,
    id: user.dataValues.id,
  };
  const token = jwt.sign(payload, secret, { expiresIn: "15m" });
  const link = `http://localhost:3000/reset-password/${user.dataValues.id}/${token}`;
  //enviar el link por nodemailer
  await transporter.sendMail({
    from: "The Wave 🏄 <pfthewhave@gmail.com>", // sender address
    to: `${user.dataValues.email}`, // list of receivers
    subject: "Recover your password for The Wave 🏄", // Subject line
    text: "Hello world?", // plain text body
    html: `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Recover your password for The Wave 🏄 </title>
      </head>
      <body>
        <p>Hello <b> ${user.dataValues.name} </b>,</p>
        <p>We received a request to reset the password for your account in The Wave. <br/>
        To proceed with this request, please click on the following link within the next 15 minutes: </p><a href=${link}>Reset password</a>
        <p>If you did not request to reset your password, please ignore this message and your account will remain unchanged.</p>
        <p>Best regards,</p>
        <p>The Wave Nautical Store 🏄 </p>
      </body>
    </html>`, // html body
  });
  
  res.send("An email with password reset instructions has been sent");
});

router.post("/reset/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password, password1 } = req.body;
  const user = await User.findOne({ where: { id } });
  

  if(!user) return res.send("this user is nost in dataase")
  if (id !== user.dataValues.id) {
    res.send("invalid id...");
    return;
  }
  const secret = JWT_SECRET_KEY + user.dataValues.password;
  try {
    //devovemos la contraseña actualizada y hasheada
    if (!token) {
      return res
        .status(401)
        .json({ message: "You must be logged in to access this resource." });
    }
    jwt.verify(token, secret, async (err, user) => {
      if (err || !user || user.exp < Date.now() / 1000) {
        // El token ha expirado
        return res.status(403).send("This token is invalid.");
      } else if (password !== password1) {
        return res.status(401).send("This password is invalid.");
      }
      user = await User.findOne({ where: { id } });
      const hash = await bcrypt.hash(password, 10);
        await User.update({ password: hash }, { where: { id: user.dataValues.id } });
      res.status(200).send("the password has been updated");
    });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});


module.exports = router;
