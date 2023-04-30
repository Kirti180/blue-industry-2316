const mongoose = require("mongoose");
require("dotenv").config();
const connection = mongoose.connect(process.env.crudURL);
module.exports = { connection };
