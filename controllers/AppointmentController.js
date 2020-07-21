const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Appointment
      .find(req.query)
      .then(dbModel => res.json(dbModel))
  },
  findById: function(req, res) {
    db.Appointment
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))   
  },
  create: function(req, res) {
      var newdata = req.body
    db.Appointment
      .create(newdata)
      .then(dbModel => res.json(dbModel))
  },
  update: function(req, res) {
    var newdata = req.body
    console.log(newdata.id)
    db.Appointment
    .findOneAndUpdate({ _id: req.params.id }, { $push: { doctor: newdata.id } }, { new: true })
      .then(dbModel => res.json(dbModel))
  },
  findDocApp: function(req, res) {
    console.log(req.params.id)
    db.Appointment
    .find({DoctorID: req.params.id})
    .then(dbModel => res.json(dbModel))
  },
  findPatApp: function(req, res) {
    console.log(req.params.id)
    db.Appointment
    .find({PatientID: req.params.id})
    .then(dbModel => res.json(dbModel))
  }
};