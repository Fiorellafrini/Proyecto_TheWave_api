const { Router } = require("express");
const userRouter = Router();
const { User } = require("../db");
const getUserId = require("../controllers/getUserId");
const postUser = require("../controllers/postUser");
const getAllUser = require ("../controllers/getAllUser")
// const deleteUserId = require ('../controllers/postUser');
const upDateUser = require("../controllers/putUser");
const {transporter} = require("../nodemailer/nodemailer.js");
///////////////////////////////////////////////GET ///////////////////////////////////////////////////////

userRouter.get("/", async (req, res) => {

  try {
    const users = await getAllUser(); // Llama al controlador para obtener todos los usuarios
    res.status(200).json(users); // Devuelve los usuarios en formato JSON con un código de estado 200
  } catch (error) {
    res.status(500).json({ error: error.message }); // Devuelve un error con un código de estado 500 si ocurre algún problema al buscar los usuarios
  }
  });


////////////////////////////////////////////// G E T ID////////////////////////////////////////////////////
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
      to: `${req.body.email}`, // list of receivers
      subject: "User created✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<p>We welcome you <b> ${req.body.name} </b>  a The Wave, 
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
    res.status(201).json(userPost);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

/////////////////////////////////////// D E L E T E ////////////////////////////////////////////////////////

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
