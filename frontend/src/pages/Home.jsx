import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { useAppointments } from "../contexts/AppointmentsContext"
import * as React from "react";
import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../layouts/default";
import { Calendar03Icon } from "../components/icons";
import fetchAllAppointments from "../hooks/fetching"

export default function Home() {
  const { appointments } = useAppointments();
  const columns = ["Name", "Time", "Date", ""];
  const navigate = useNavigate();
  React.useEffect(() => fetchAllAppointments, []);

  return (
    <DefaultLayout>
      <div className="flex items-center gap-2 text-foreground my-3">
        <Calendar03Icon color="foreground" />
        <span className="font-bold text-3xl">{appointments.length} Appointment{appointments.length != 1 && "s"}</span>
      </div>

      <Table aria-label="Example table with dynamic content" className="w-full">
        <TableHeader>
          {columns.map((column) =>
            <TableColumn key={column}>{column}</TableColumn>
          )}
        </TableHeader>

        <TableBody >
          {appointments.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.firstName} {row.lastName}</TableCell>
              <TableCell>{row.appointmentTime}</TableCell>
              <TableCell>{row.appointmentDate}</TableCell>

              <TableCell>
                <Button
                  onPress={() => navigate(`/appointment/${row._id}`)}
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
