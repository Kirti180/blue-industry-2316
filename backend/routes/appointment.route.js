const express = require("express");
const appointmentRouter = express.Router();
const { default: mongoose } = require("mongoose");
const { appointmentModel } = require("../models/appointment.model");
const { authentication } = require("../middleware/Authentication");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const {authorise} = require("../middleware/Authorization")
const {photoauth}=require("../middleware/photo.authantication")
require("dotenv").config()

//booking appointment api
appointmentRouter.post("/booking/:id", (req, res) => {
  const id = req.params.id;
  const token = req.headers.authorization;
  if(!token){
    return res.status(400).send({"msg":"login first"})
  }
  jwt.verify(token, process.env.secretKey, async (err, decoded) => {
    if (decoded) {
      req.body.user = decoded.userId;
      req.user = await UserModel.find({ _id: decoded.userid });
      const user_id = req.user[0]._id;
      console.log(req.user)
      const {
        clientName,
        email,
        occasion,
        start_time,
        end_time,
        bookedOn,
        status,
      } = req.body;

      const existingAppointment = await appointmentModel.findOne({
      
        start_time:start_time,
        end_time:end_time,
        bookedOn:bookedOn,
        photographer:id,
     });
       try {
       console.log(existingAppointment)
       if(existingAppointment){
        return res.status(400).send({"msg":"There is already an appointment scheduled on this date and time. Please book another slot"})
       }
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
//(taking photographer id in params)
appointmentRouter.get("/:id",photoauth, async (req, res) => {
    const id = req.params.id
  const appointmentData = await appointmentModel.find({photographer:id,status:"Pending"});
  res.send(appointmentData);
});


//get appointment details of respective photographers 
appointmentRouter.get("/getData/:id",photoauth, async (req, res) => {
  const id = req.params.id
const appointmentData = await appointmentModel.find({photographer:id});
res.send(appointmentData);
});


//get data of appointment status
appointmentRouter.get("/userdata/:id", async (req, res) => {
  const id = req.params.id
 
const appointmentData = await appointmentModel.find({user_id:id});
let acceptedData = await appointmentModel.find({status:"Accepted",_id:appointmentData})
let rejectedData = await appointmentModel.find({status:"Rejected",_id:appointmentData})
let pendingData = await appointmentModel.find({status:"Pending",_id:appointmentData})
res.send({pendingData,acceptedData,rejectedData});
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



//accepting appointment (appointment id as params)
appointmentRouter.patch("/accept/:id",photoauth, async (req, res) => {
    const id = req.params.id

    const appointedData = await appointmentModel.findByIdAndUpdate({_id:id},{status:"Accepted"})
   // const updateStatus = await appointmentModel.findByIdAndUpdate({_id:id},{photographer})
     res.status(200).send({appointedData,"msg":"Appointment Status Updated"})
});



//reject api
appointmentRouter.patch("/reject/:id",photoauth, async (req, res) => {
  const id = req.params.id

  const appointedData = await appointmentModel.findByIdAndUpdate({_id:id},{status:"Rejected"})
 // const updateStatus = await appointmentModel.findByIdAndUpdate({_id:id},{photographer})
   res.status(200).send({appointedData,"msg":"Appointment Status Updated"})
});



//accepted appointments


module.exports = { appointmentRouter };
