import axios from "axios"; // Axios for HTTP requests
import { useAppointments } from "../contexts/AppointmentsContext"; // Appointments context hook

// Function to fetch all appointments from the server
export const fetchAllAppointments = async (setAppointments) => {
  // const { setAppointments } = useAppointments(); // Destructure setAppointments set state function from context

  try {
    const response = await axios.get(
      "http://localhost:5000/fetchAllAppointments"
    );
    setAppointments(response.data); // Update appointments context
  } catch (error) {
    console.error("Error fetching appointments:", error);
  }
};
