const { Router } = require("express");
const createReview = require("../controllers/postComments.js");
const {getComment, getAllComments} = require("../controllers/getComments.js");
const router = Router();

router.post("/", async (req, res) => {

    const addReview = await createReview(req.body)
    const { content, rating, idProperty, idUser } = req.body
  try {
    res.status(201).json(addReview);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

router.get("/", async (req, res) => {
    const comments = await getAllComments();
    try {
      res.status(200).json({ comentarios: comments });
    } catch (error) {
      res.status(400).json({ Error: error.message });
    }
})
router.get("/", async (req, res) => {

})

module.exports = router;