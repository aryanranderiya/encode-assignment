import api from "../apiaxios";

// Function to fetch all appointments from the server
export const fetchAllAppointments = async (setAppointments) => {
  try {
    const response = await api.get("/fetchAllAppointments");
    setAppointments(response.data); // Update appointments context
  } catch (error) {
    console.error("Error fetching appointments:", error);
  }
};
