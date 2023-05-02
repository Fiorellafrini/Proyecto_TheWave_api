const { Router } = require("express");
const { User } = require("../db.js");
const jwt = require("jsonwebtoken");
const { passport, authenticate } = require("../passport.js");
const router = Router();
const {transporter} = require("../nodemailer/nodemailer.js");
const {
  JWT_SECRET_KEY
} = process.env;
router.post("/", passport.authenticate("local"), (req, res) => {
  try {
    let user = req.user;

    /////////// ESTO AGREGO PARA LA VERIFICACION DE ACTIVO O INACTIVO /////////////////////////
    if (!user.active) {
      // Si el usuario no está activo, enviar una respuesta de error.
      res.status(401).json({ error: "El usuario ha sido dado de baja." });
      return;
    }
 /////////////////////////////////////////////////////////////////////////////////////////////////

    //Crear el token JWT con los datos del usuario.
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
    };
    const token = jwt.sign(payload, "contraseña ", {
      expiresIn: "1d",
    });

    res.status(200).json({
      token: token,
      user: payload,
    });
  } catch (error) { 
    console.log(error)
    res.status(500).json({ error: "Ha ocurrido un error." });
  }
});
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get("/google/callback",passport.authenticate("google", { failureRedirect: "/auth" }), async (req, res) => {
    const user = req.user;
    payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      photo:user.photo
    };
    token = jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    tokenStr = JSON.stringify(token);
    res.status(200).send(`<!DOCTYPE html>
    <html lang="en">
      <body>
      </body>
      <script>
       window.opener.postMessage(${tokenStr}, 'http://localhost:3000')

      </script>
    </html>`),
      await transporter.sendMail({
        from: "The Wave 🏄 <pfthewhave@gmail.com>", // sender address
        to: `${user.email}`, // list of receivers
        subject: "User created✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<p>We welcome you <b> ${user.name} </b>  a The Wave, 
      we are delighted to have you as a new user in our application. 
      From now on, you will be able to enjoy all the functions and features we offer on our platform.
      and features that we offer on our platform.At The Wave, we strive to provide an exceptional user
      to provide an exceptional user experience, so if you have any questions or suggestions 
      have any questions or suggestions on how to improve our service,
      no dudes en ponerte en contacto con nosotros.Esperamos que disfrutes
      your experience in our application and that you can take full advantage of all that The Wave has to offer.
      everything The Wave has to offer.</br>
      </br>
      Thank you for joining us!</br>
    Best regards, The Wave Team
      </p><a href="https://proyecto-the-wave-client-1kip.vercel.app/SectionHome">Nuestro link</a>

// `, // html body
      });
  }
);
router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate(
    "facebook",
    { scope: ["email"] },
    { successReturnToOrRedirect: "/", failureRedirect: "/auth" }
  )
);
router.get("/", (req, res) => {
  const { info } = req.query;
  res.send(JSON.parse(info));
});
router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
module.exports = router;
