import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { UserIcon, MagicWand01Icon, Call02Icon, ServiceIcon, NoteEditIcon, Calendar03Icon, EditOffIcon, AlarmClockIcon } from "../components/icons";
import { DatePicker } from "@nextui-org/date-picker";
import axios from 'axios';
import DefaultLayout from "../layouts/default";
import { toast } from "sonner"
import { useParams } from "react-router-dom";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { Chip } from "@nextui-org/react";
import fetchAllAppointments from "../hooks/fetching"

const stylists = [
    { key: "jane-doe", label: "Jane Doe" },
    { key: "john-smith", label: "John Smith" },
    { key: "emily-clark", label: "Emily Clark" },
    { key: "michael-brown", label: "Michael Brown" },
];

const services = [
    { key: "haircut", label: "Haircut" },
    { key: "beard-trimming", label: "Beard Trimming" },
    { key: "hair-coloring", label: "Hair Coloring" },
    { key: "manicure", label: "Manicure" },
    { key: "pedicure", label: "Pedicure" },
    { key: "facial", label: "Facial" },
];

export default function AppointmentForm({ viewonly = false }) {
    const { id } = useParams();

    const fetchAppointmentData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/fetchAppointment/${id}`);
            setFormData(response.data)
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message
            console.error('Error fetching appointment:', errorMessage);
        }
    }
    
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        stylist: "",
        service: "",
        appointmentDate: "",
        appointmentTime: "",
        notes: "",
    });

    React.useEffect(() => {
        if (!viewonly || !id) {
            setFormData({
                firstName: "",
                lastName: "",
                phone: "",
                stylist: "",
                service: "",
                appointmentDate: "",
                appointmentTime: "",
                notes: "",
            })
            return;
        }
        fetchAppointmentData()
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/createAppointment', formData);
            console.log('Appointment created:', response.data);
            event.target.reset();
            toast.info("Appointment has been created.")
            fetchAllAppointments();
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message
            toast.error("Error: Appointment could not be created. " + errorMessage)
            console.error('Error creating appointment:', errorMessage);
        }
    };

    return (
        <DefaultLayout>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3 justify-center">
                    <div className="my-3">
                        <div className="flex items-center gap-2 text-foreground">
                            <Calendar03Icon color="foreground" />
                            <span className="font-bold text-3xl">Add New Appointment</span>
                        </div>

                        {viewonly ? <Chip size="sm" variant="flat" color="danger" className="mt-2">
                            <div className=" flex flex-row items-center gap-2">
                                <EditOffIcon color="primary" width="15" />
                                Read Only
                            </div>
                        </Chip> :
                            <span className="text-lg text-foreground-400">Enter customer details</span>
                        }
                    </div>

                    <div className="flex gap-2">
                        <Input
                            type="text"
                            label="Customer First Name"
                            placeholder="John"
                            variant="faded"
                            isRequired
                            startContent={<UserIcon width="20" />}
                            name="firstName"
                            value={formData.firstName}
                            isInvalid={formData.firstName === ""}
                            isReadOnly={viewonly}
                            errorMessage="Please enter first name"
                            onValueChange={(value) => setFormData((prevData) => ({
                                ...prevData,
                                firstName: value,
                            }))}
                        />

                        <Input
                            type="text"
                            label="Customer Last Name"
                            placeholder="Doe"
                            variant="faded"
                            isRequired
                            isInvalid={formData.lastName === ""}
                            value={formData.lastName}
                            isReadOnly={viewonly}
                            startContent={<UserIcon width="20" />}
                            name="lastName"
                            errorMessage="Please enter last name"
                            onValueChange={(value) => setFormData((prevData) => ({
                                ...prevData,
                                lastName: value,
                            }))}
                        />
                    </div>

                    <Input
                        type="phone"
                        label="Phone"
                        placeholder="1234567890"
                        variant="faded"
                        isRequired
                        value={formData.phone}
                        isReadOnly={viewonly}
                        startContent={<Call02Icon width="20" />}
                        name="phone"
                        isInvalid={formData.phone.length != 10}
                        errorMessage="Phone number must be of 10 digits"
                        onValueChange={(value) => setFormData((prevData) => ({
                            ...prevData,
                            phone: value,
                        }))}
                    />

                    <Select
                        label="Stylist"
                        variant="faded"
                        startContent={<MagicWand01Icon width="20" />}
                        name="stylist"
                        isInvalid={formData.stylist === ""}
                        errorMessage="Please select a stylist"
                        selectedKeys={[formData.stylist]}
                        isReadOnly={viewonly}
                        onChange={(e) => setFormData((prevData) => ({
                            ...prevData,
                            stylist: e.target.value,
                        }))}
                    >
                        {stylists.map((stylist) => (
                            <SelectItem key={stylist.key} value={stylist.label}>
                                {stylist.label}
                            </SelectItem>
                        ))}
                    </Select>

                    <Select
                        label="Service"
                        variant="faded"
                        startContent={<ServiceIcon width="20" />}
                        name="service"
                        isInvalid={formData.service === ""}
                        errorMessage="Please select a service"
                        selectedKeys={[formData.service]}
                        isReadOnly={viewonly}
                        onChange={(e) => setFormData((prevData) => ({
                            ...prevData,
                            service: e.target.value,
                        }))}
                    >
                        {services.map((service) => (
                            <SelectItem key={service.key} value={service.label}>
                                {service.label}
                            </SelectItem>
                        ))}
                    </Select>

                    <div className="flex gap-2">
                        <DatePicker
                            variant="faded"
                            label="Appointment Date"
                            name="appointmentDate"
                            isInvalid={
                                !formData.appointmentDate ||
                                new Date(formData.appointmentDate) < today(getLocalTimeZone()).toDate()
                            }
                            errorMessage="Please enter a valid date."
                            isReadOnly={viewonly}
                            minValue={today(getLocalTimeZone())}
                            onChange={(event) => {
                                setFormData((prevData) => ({
                                    ...prevData,
                                    appointmentDate: event?.toString(),
                                }));
                            }}
                            value={
                                formData.appointmentDate
                                    ? parseDate(formData.appointmentDate)
                                    : null
                            }
                        />

                        <Input
                            type="time"
                            label="Appointment Time"
                            placeholder="1234567890"
                            variant="faded"
                            isRequired
                            value={formData.appointmentTime}
                            isReadOnly={viewonly}
                            startContent={<AlarmClockIcon width="20" />}
                            name="appointmentTime"
                            isInvalid={!formData.appointmentTime}
                            errorMessage="Please select an appointment time"
                            onValueChange={(value) => setFormData((prevData) => ({
                                ...prevData,
                                appointmentTime: value,
                            }))}
                        />

                    </div>

                    <Textarea
                        label="Notes"
                        placeholder="Enter notes, if any"
                        startContent={<NoteEditIcon width="20" />}
                        variant="faded"
                        name="notes"
                    />

                    <Button
                        type="submit"
                        variant="shadow"
                        color="primary"
                        className="font-medium mt-3"
                    >
                        Add new appointment
                    </Button>
                </div>
            </form>
        </DefaultLayout >
    );
}
