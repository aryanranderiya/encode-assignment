import axios from "axios";
import { useAppointments } from "../contexts/AppointmentsContext";

export default async function fetchAllAppointments() {
  const { setAppointments } = useAppointments();

  try {
    const response = await axios.get(
      "http://localhost:5000/fetchAllAppointments"
    );
    setAppointments(response.data);
  } catch (error) {
    console.error("Error fetching appointments:", error);
  }
}
