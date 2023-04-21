const { Router } = require("express");
const userRouter = Router();
const { User } = require("../db");
const getUserId = require("../controllers/getUserId");
const postUser = require("../controllers/postUser");
// const deleteUserId = require ('../controllers/postUser');
const upDateUser = require("../controllers/putUser");
const {transporter} = require("../nodemailer/nodemailer.js");

////////////////////////////////////////////// G E T ////////////////////////////////////////////////////
userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const userId = await getUserId(id);
    res.status(200).json(userId);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

////////////////////////////////////////////// P O S T ////////////////////////////////////////////////////

userRouter.post("/", async (req, res) => {
  try {
    const userPost = await postUser(req.body);
    await transporter.sendMail({
      from: "The Wave 🏄 <pfthewhave@gmail.com>", // sender address
      to: req.body.email, // list of receivers
      subject: "Usuario creado✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<b>Hello ${req.body.name} </b><p> Nos complace informarte que tu cuenta ha sido creada con éxito.
<a href="https://proyecto-the-wave-client-1kip.vercel.app/SectionHome">Aquí</a> podrás descubrir increibles productos de surf. </p>
`, // html body
    });
    res.status(201).json(userPost);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

/////////////////////////////////////// D E L E T E ////////////////////////////////////////////////////////
// userRouter.delete('/delete/:id', async(req, res) =>{
//     const { id } = req.params
//     try {
//       const deleteUser= await deleteUserId(id)
//       res.status(200).json(deleteUser)
//     } catch (error) {
//       res.status(404).send({error: error.message})
//     }
//   });

userRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByPk(id);
    deleteUser.destroy();
    res.status(200).json(deleteUser);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

//////////////////////////////////////////////// PUT /////////////////////////////////////////////////////

userRouter.put("/:id/active", async (req, res) => {
  const id = req.params.id;
  const { name, lastName, email, active } = req.body;

  try {
    const user = await upDateUser(id, {
      name,
      lastName,
      email,
      active,
    });
    if (user) return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

module.exports = userRouter;
