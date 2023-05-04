const mongoose = require("mongoose");

const appointment = mongoose.Schema({
  photographer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Photographer",
    required: true,
  },
  clientName: {
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
});

const appointmentModel = mongoose.model("Appointment", appointment);

module.exports = { appointmentModel };
