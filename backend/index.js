const express = require("express");
const app = express();
const cors = require("cors");
const {connection}=require('./db')
app.use(express.json());
app.use(cors());

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }
});
