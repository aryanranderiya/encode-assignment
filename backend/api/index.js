const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./connect");
require("dotenv").config();

const fetchAppointments = require("./routes/fetchAppointments");
const createAppointment = require("./routes/createAppointment");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use(createAppointment);
app.use(fetchAppointments);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
