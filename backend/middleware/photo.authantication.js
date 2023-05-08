const jwt = require("jsonwebtoken");
const fs = require("fs");
const photoauth = async (req, res, next) => {
  var token = req.headers.authorization;
  if (!token) {
    res.send({ msg: "bad request" });
  }
  //   const blacklistdata = JSON.parse(
  //     fs.readFileSync("./blacklist.json", "utf-8")
  //   );
  //   if (blacklistdata.includes(token)) {
  //     res.send({ msg: "please login" });
  //   } else {
  if (token) {
    try {
      let decoded = jwt.verify(token, "onesecret");
      if (decoded) {
        req.body.user = decoded.userID;
        req.body.role = decoded.role;
        next();
      } else {
        res.send({ msg: "login again" });
      }
    } catch (err) {
      // console.log(err);
      res.status(400).send({ msg: "login first" });
    }
  }
};
// };
module.exports = { photoauth };
