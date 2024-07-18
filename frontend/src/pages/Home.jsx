import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { useAppointments } from "../contexts/AppointmentsContext"
import * as React from "react";
import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../layouts/default";
import { Calendar03Icon } from "../components/icons";
import { fetchAllAppointments } from "../hooks/fetching"


export default function Home() {
  const { appointments, setAppointments } = useAppointments(); // Retrieve appointments from context
  const columns = ["Name", "Time", "Date", ""]; // Table column headers
  const navigate = useNavigate();

  // Fetch all appointments on component mount
  React.useEffect(() => {
    fetchAllAppointments(setAppointments);
  }, []);

  return (
    <DefaultLayout> {/* Use default layout (parent container) */}
      <div className="flex items-center gap-2 text-foreground my-3">
        <Calendar03Icon color="foreground" />

        {/* Display number of appointments, append "s" if more than 1 appointment */}
        <span className="font-bold text-3xl">{appointments.length} Appointment{appointments.length !== 1 && "s"}</span>
      </div>

      <Table aria-label="Example table with dynamic content" className="w-full">
        <TableHeader>
          {/* Render table columns */}
          {columns.map((column) =>
            <TableColumn key={column}>{column}</TableColumn>
          )}
        </TableHeader>

        <TableBody>
          {/* Render appointment rows */}
          {appointments.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.firstName} {row.lastName}</TableCell>
              <TableCell>{row.appointmentTime}</TableCell>
              <TableCell>{row.appointmentDate}</TableCell>

              <TableCell>
                <Button
                  onPress={() => navigate(`/appointment/${row._id}`)} // Navigate to appointment details page
                  variant="faded"
                  color="primary"
                  size="sm"
                  className="font-medium"
                >
                  View More
                </Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DefaultLayout>
  );
}