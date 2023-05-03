// write model for user
const mongoose = require("mongoose");
const { emit } = require("nodemon");
user = mongoose.Schema({

  firstName:{
    type: String,
    required: true,
  },

  lastName:{
    type: String,
    required: true,
  },

  mobileNo:{
    type: Number,
    required: true,
  },

  email:{
    type: String,
    required: true,
  },

  password:{
    type: String,
    required: true,
  },
  role:{
    type:String,
    required:true,
    default:"User",
    enum:["Admin","Photographer","User"]
}
});

UserModel = mongoose.model("UserData", user);
module.exports = { UserModel };
