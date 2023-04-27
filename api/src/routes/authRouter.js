const { Router } = require("express");
const { User } = require("../db.js");
const jwt = require("jsonwebtoken");
const { passport, authenticate } = require("../passport.js");
const router = Router();
const {
  JWT_SECRET_KEY
} = process.env;
router.post("/", passport.authenticate("local"), (req, res) => {
  try {
    let user = req.user;
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
    res.status(500).json({ error: "Ha ocurrido un error." });
  }
});
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth" }),
  (req, res) => {
    const user = req.user;
    payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
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
    </html>`);
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
