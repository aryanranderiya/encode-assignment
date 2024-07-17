const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    match: [/^\+?\d{10}$/, "Please enter a valid phone number"],
  },
  stylist: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  appointmentDate: {
    type: String,
    required: true,
  },
  appointmentTime: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
