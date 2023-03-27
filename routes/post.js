const express = require("express");
const postRouter = express.Router();
postRouter.use(express.json());
const { PostModel } = require("../model/post.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

// postRouter.use(auth);

// Get posts
postRouter.get("/", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "masai");

  let query = req.query;
  let notes = await NoteModel.find({ userID: decoded.userID, query });
  res.status(200).send(notes);
});

// Add Post
postRouter.post("/add", async (req, res) => {
  const payload = req.body;
  console.log(payload);
  try {
    const post = await PostModel(payload);
    res.status(200).send({ msg: "Post has been added" });
    await post.save();
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// Delete Post
postRouter.delete("/delete/:postId", async (req, res) => {
  let { postId } = req.params;
  try {
    await PostModel.findByIdAndDelete({ _id: postId });
    res.status(200).send({ msg: "Post has been Deleted" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// Update Post
postRouter.patch("/update/:postId", async (req, res) => {
  let { postId } = req.params;
  let payload = req.body;
  try {
    await PostModel.findByIdAndUpdate({ _id: postId }, payload);
    res.status(200).send({ msg: "Post has been Updated" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = {
  postRouter,
};
