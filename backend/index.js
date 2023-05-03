const express = require("express");
const app = express();
const cors = require("cors");
const { connection } = require("./db");
const { photographyRouter } = require("./routes/photographer.route");
app.use(express.json());
app.use(cors());
app.use("/photographer", photographyRouter);
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }
});
