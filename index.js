const express = require("express");
const app = express();
app.use(express.json());
const connection = require("./config");
require("dotenv").config();
const cors = require("cors");
const { auth } = require("./middlewares/auth");
const { userRouter } = require("./routes/users");
const { postRouter } = require("./routes/post");

app.user(cors());

app.use("/users", userRouter);
app.use(auth);
app.use("/post", postRouter);

app.listen(process.env.PORT, async () => {
  console.log(`Server is running at ${process.env.PORT}`);
  try {
    await connection;
    console.log("Server is connected");
  } catch (err) {
    console.log("Someting went wrong");
    console.log(err);
  }
});
