const express = require("express");
const app = express();
const cors = require("cors");
const { connection } = require("./db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const {authentication} = require("./middleware/Authentication")
const {authorise} = require("./middleware/Authorization")
const cookieparser = require("cookie-parser")
const {UserModel} = require("./models/user.model")
const { photographyRouter } = require("./routes/photographer.route");
const { UserRoute } = require("./routes/user.route");
require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use(cookieparser())

app.use("/photographer", photographyRouter);

app.get("/",(req,res)=>{
  res.send("Welcome")
} )

app.use("/User", UserRoute)

app.use(authentication)

app.get("/user", async(req,res)=>{
try {
  const data= await UserModel.find()
  // console.log(req.cookies)
  res.send(data)
} catch (error) {    
  res.send(error.message)
}
})

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }
});
