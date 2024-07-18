import { Listbox, ListboxSection, ListboxItem } from "@nextui-org/listbox";
import { Calendar03Icon } from "../components/icons";
import * as React from "react";
import axios from 'axios';
import { useAppointments } from "../contexts/AppointmentsContext"
import { ScrollArea } from "../components/ui/scroll-area";

export default function Sidebar() {
    const { appointments, setAppointments } = useAppointments();
    const [groupedAppointments, setGroupedAppointments] = React.useState({});
    const [sortedAppointments, setSortedAppointments] = React.useState({});

    React.useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/fetchAllAppointments');
                setAppointments(response.data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    function groupAppointments(appointments) {
        return appointments.reduce((acc, appointment) => {
            const groupArray = acc[appointment.appointmentDate] = acc[appointment.appointmentDate] || []
            groupArray.push(appointment);
            return acc;
        }, {});
    }

    function sortAppointments(appointments) {
        return Object.entries(appointments)
            .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
            .reduce((acc, [date, apps]) => {
                acc[date] = apps;
                return acc;
            }, {});
    }

    React.useEffect(() => {
        if (appointments.length > 0) setGroupedAppointments(groupAppointments(appointments));
    }, [appointments]);

    React.useEffect(() => {
        if (Object.keys(groupedAppointments).length > 0) setSortedAppointments(sortAppointments(groupedAppointments));
    }, [groupedAppointments]);


    function checkDate(date) {
        const today = new Date();
        const givenDate = new Date(date);

        today.setHours(0, 0, 0, 0);
        givenDate.setHours(0, 0, 0, 0);

        if (today.getTime() > givenDate.getTime()) return null
        else if (today.getTime() === givenDate.getTime()) return "Today";
        else if (today.getTime() + 86400000 === givenDate.getTime()) return "Tomorrow";
        else return date.toString();
    }

    return (
        <div className="w-[300px] h-screen dark:bg-white dark:bg-opacity-10 bg-black bg-opacity-10 p-3 pt-[65px] flex flex-col">
            <span className="py-3 px-2 font-medium text-sm flex gap-2 items-center">
                <Calendar03Icon width="18" color="foreground" />
                Upcoming Appointments
            </span>

            <ScrollArea>

                <div className="w-full max-w-[260px] px-1 py-2 rounded-small bg-black dark:bg-opacity-50 bg-opacity-5 border-default-200 dark:border-default-100">
                    <Listbox variant="flat" aria-label="Listbox menu with sections" emptyContent={<span className="text-xs">No appointments scheduled</span>}>
                        {!!sortedAppointments &&
                            Object.entries(sortedAppointments).map(([date, appointments], index) => (
                                !!checkDate(date) && <ListboxSection key={date} title={checkDate(date)}
                                    showDivider={true} >
                                    {
                                        appointments.map(appointment => (
                                            <ListboxItem
                                                key={appointment._id}
                                                description={`${appointment.firstName} ${appointment.lastName}`} href={`/appointment/${appointment._id}`}
                                            >
                                                {appointment.appointmentTime}
                                            </ListboxItem>
                                        ))
                                    }
                                </ListboxSection>

                            ))

                        }
                    </Listbox>
                </div>
            </ScrollArea>

        </div >
    );
}
