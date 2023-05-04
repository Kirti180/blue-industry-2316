const mongoose = require("mongoose");
photo = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  email:{
    type:String,
    require:true
  },
  pass:{type:String,
  require:true},

  role:{type:String,
    default:"photographer"},

  image: {
    type: String,
    required: true,
  },
  occasion: [{
    name: String,
    slots: [{
      time: String,
      booked: {
        type: Boolean,
        default: false
      }
    }]
  }],

  address: {
    type: String,
    required: true,
  },
  charges: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  workingtime: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
});
photoModel = mongoose.model("Photographer", photo);
module.exports = { photoModel };
