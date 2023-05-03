const mongoose = require("mongoose");
photo = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  // occasion:{
  //   name: String,
  //   require:true,
  //   slots: [{
  //     time: String,
  //     require:true,
  //     booked: {
  //       type: Boolean,
  //       default: false
  //     }
  //   }]
  // },

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
