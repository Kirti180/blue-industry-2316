const express = require("express");
const appointmentRouter = express.Router();
const { default: mongoose } = require("mongoose");
const { appointmentModel } = require("../models/appointment.model");
const { authentication } = require("../middleware/Authentication");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");


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


//get total appointment requests and datas with respect to photographers on photographer's admin page
appointmentRouter.get("/:id", async (req, res) => {
    const id = req.params.id
  const appointmentData = await appointmentModel.find({photographer:id});
  res.send(appointmentData);
});




//getting specific photographer's appointment details as well as user details using appointments id
appointmentRouter.get("/getAppointmentDetails/:id", async (req, res) => {
    const id = req.params.id;
    const data1 = await appointmentModel.find({ _id: id }).populate("user_id");
    const data2 = await appointmentModel
      .find({ _id: id })
      .populate("photographer");
    res.send({ data1, data2 });
  });


appointmentRouter.get("/", async (req, res) => {
  const appointmentData = await appointmentModel.find();
  res.send(appointmentData);
});



//accepting appointment 
appointmentRouter.patch("/status/:id", async (req, res) => {
    const id = req.params.id
    const status = req.body

    const appointedData = await appointmentModel.findByIdAndUpdate({_id:id},status)
   // const updateStatus = await appointmentModel.findByIdAndUpdate({_id:id},{photographer})
     res.status(200).send({appointedData,"msg":"Appointment Status Updated"})
});

module.exports = { appointmentRouter };
