// const { Router } = require("express");
// const { User } = require("../db.js");
// const jwt = require("jsonwebtoken");
// const { passport, authenticate } = require("../passport.js");
// const router = Router();
// router.post("/", passport.authenticate("local"), (req, res) => {
//   try {
//     let user = req.user;
//     //Crear el token JWT con los datos del usuario.
//     const payload = {
//       id: user.id,
//       email: user.email,
//       name: user.name,
//       lastName: user.lastName,
//     };
//     const token = jwt.sign(payload, "contraseña ", {
//       expiresIn: "1d",
//     });
//     res.status(200).json(token);
//   } catch (error) {
//     res.status(500).json({ error: "Ha ocurrido un error." });
//   }
// });
// router.get(
//   "/auth/google",
//   passport.authenticate(
//     "google",
//     { scope: ["email", "profile"] },
//     {
//       session: false,
//     }
//   ),
//   (req, res) => {
//     const user = req.user;
//     payload = {
//       id: user.id,
//       email: user.email,
//       name: user.name,
//       lastName: user.lastName,
//     };
//     token = jwt.sign(payload, "process.env.JWT_SECRET_KEY", {
//       expiresIn: "1d",
//     });

//     res.json(token);
//   }
// );
// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/auth/failure" }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     res.redirect("/");
//   }
// );
// router.get("/auth/facebook", passport.authenticate("facebook"));

// router.get(
//   "/auth/facebook/callback",
//   passport.authenticate(
//     "facebook",
//     { scope: ["email"] },
//     { failureRedirect: "/login" }
//   )
// );
// router.post("/logout", function (req, res, next) {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("/");
//   });
// });
// module.exports = router;
