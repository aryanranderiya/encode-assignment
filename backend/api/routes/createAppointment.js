const express = require("express");
const router = express.Router();
const Appointment = require("../models/AppointmentModel");

router.post("/createAppointment", async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
