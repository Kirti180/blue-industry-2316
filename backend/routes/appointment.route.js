const express = require("express");
const appointmentRouter = express.Router();
const { default: mongoose } = require("mongoose");
const { appointmentModel } = require("../models/appointment.model");
const { authentication } = require("../middleware/Authentication");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

//getting specific photographer's appointment details as well as user details using appointments id
appointmentRouter.get("/getAppointmentDetails/:id", async (req, res) => {
  const id = req.params.id;
  const data1 = await appointmentModel.find({ _id: id }).populate("user_id");
  const data2 = await appointmentModel
    .find({ _id: id })
    .populate("photographer");
  res.send({ data1, data2 });
});

//booking appointment api
appointmentRouter.post("/book/:id", (req, res) => {
  const id = req.params.id;
  const token = req.headers.authorization;
  jwt.verify(token, "imran", async (err, decoded) => {
    if (decoded) {
      req.body.user = decoded.userId;
      req.user = await UserModel.find({ _id: decoded.userId });
      const user_id = req.user[0]._id;
      const {
        clientName,
        email,
        occasion,
        start_time,
        end_time,
        bookedOn,
        status,
      } = req.body;
      try {
        const newAppointment = new appointmentModel({
          user_id: user_id,
          clientName,
          email,
          status,
          occasion,
          start_time,
          end_time,
          bookedOn,
          photographer: id,
        });
        await newAppointment.save();
        return res.send({
          message: "Appointment Request Sent",
          newAppointment,
        });
      } catch (error) {
        return res.status(400).send({ message: error.message });
      }
    }
  });
});

appointmentRouter.get("/", async (req, res) => {
  const appointmentData = await appointmentModel.find();
  res.send(appointmentData);
});

//accepting appointment api
// appointmentRouter.patch("/accept/:id", async (req, res) => {
//     const id = req.params.id
//     const token = req.headers.authorization
//     jwt.verify(token, "imran", async (err, decoded) => {
//         if (decoded) {
//           req.body.user = decoded.userId;
//           req.user = await UserModel.find({ _id: decoded.userId });
//           const user_id = req.user[0]._id;

//           const appointedUser = await appointmentModel.findOne({user_id:user_id,})
//         }
//     })
// });

module.exports = { appointmentRouter };
