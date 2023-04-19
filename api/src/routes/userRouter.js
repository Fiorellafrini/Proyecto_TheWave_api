const { Router } = require("express");
const userRouter = Router();
const { User } = require("../db");
const getUserId = require("../controllers/getUserId");
const postUser = require("../controllers/postUser");
// const deleteUserId = require ('../controllers/postUser');
const upDateUser = require("../controllers/putUser");

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
    if (!userPost) throw Error("user not found");
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
