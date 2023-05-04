const mongoose = require("mongoose");

const appointment = mongoose.Schema({
  clientName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  occasion: {
    type: String,
    required: true,
  },
  slot: {
    type: String,
    required: true,
  },
  bookedOn: {
    type: Date,
    default: Date.now,
  },


  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserData',
    required: true
},
photographer: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Photographer",
  required: true,
},

});

const appointmentModel = mongoose.model("Appointment", appointment);

module.exports = { appointmentModel };
