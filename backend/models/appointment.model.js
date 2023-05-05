const mongoose = require("mongoose");
const { Schema } = mongoose;

const appointment = mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  occasion: {
    type: String,
    required: true,
  },
  start_time: {
    type: String,
    required: true,
  },
  end_time: {
    type: String,
    required: true,
  },
  bookedOn: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Accepted", "Rejected"],
  },

  user_id: {
    type: Schema.Types.ObjectId,
    ref: "UserData",
    required: true,
  },
  photographer: {
    type: Schema.Types.ObjectId,
    ref: "Photographer",
    required: true,
  },
});

const appointmentModel = mongoose.model("Appointment", appointment);

module.exports = { appointmentModel };
