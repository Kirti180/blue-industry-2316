// write model for user
const mongoose = require("mongoose");
const { emit } = require("nodemon");
let block = mongoose.Schema({

  token:{
    type: String,
    required: true,
  }

});

BlacklistModel = mongoose.model("Blacklist", block);
module.exports = { BlacklistModel };
