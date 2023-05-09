const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config()
const photoauth = async (req, res, next) => {
  var token = req.headers.authorization;
  if (!token) {
    res.status(400).send({ msg: "Login first" });
  }
  //   const blacklistdata = JSON.parse(
  //     fs.readFileSync("./blacklist.json", "utf-8")
  //   );
  //   if (blacklistdata.includes(token)) {
  //     res.send({ msg: "please login" });
  //   } else {
  if (token) {
    try {
      let decoded = jwt.verify(token, process.env.secretone);
      if (decoded) {
        req.body.user = decoded.userID;
        req.body.role = decoded.role;
        next();
      } else {
        res.status(200).send({ msg: "login again" });
      }
    } catch (err) {
      // console.log(err);
      res.status(400).send({ msg: "Token expired.. login again" });
    }
  }
};
// };
module.exports = { photoauth };
