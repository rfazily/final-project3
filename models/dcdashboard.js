
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const appointmentSchema = new Schema({
  PatientID: {type: String, required: true},
  PatientName: {type: String, required: true},
  DoctorID: {type: String, required: true},
  DoctorName: {type:String, required: true},
  Appointment: {type: String, required: true}
  });
  
  const Appointment = mongoose.model("Appointment", appointmentSchema);
  
  module.exports = Appointment;