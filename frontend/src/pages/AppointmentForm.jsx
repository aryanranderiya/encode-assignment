import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { UserIcon, MagicWand01Icon, Call02Icon, ServiceIcon, NoteEditIcon, Calendar03Icon } from "../components/icons";
import { TimeInput } from "@nextui-org/date-input";
import { DatePicker } from "@nextui-org/date-picker";
import axios from 'axios';
import DefaultLayout from "../layouts/default";
import { toast } from "sonner"


export default function AppointmentForm({ viewonly = false }) {
    const [validationState, setValidationState] = useState({
        firstName: true,
        lastName: true,
        phone: true,
        stylist: true,
        service: true,
        appointmentDate: true,
        appointmentTime: true,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            phone: formData.get('phone'),
            stylist: formData.get('stylist'),
            service: formData.get('service'),
            appointmentTime: formData.get('appointmentTime'),
            appointmentDate: formData.get('appointmentDate'),
            notes: formData.get('notes'),
        };

        const fieldsToValidate = ['firstName', "lastName", 'phone', 'stylist', 'service', 'appointmentTime', "appointmentDate"];
        let isValid = true;
        const nextState = {};

        fieldsToValidate.forEach(field => {
            if (!data[field] || (field === "phone" && data[field].length != 10)) {
                isValid = false;
                nextState[field] = false;
            }
            else nextState[field] = true;
        });

        setValidationState(nextState);
        if (!isValid) return;


        try {
            const response = await axios.post('http://localhost:5000/createAppointment', data);
            console.log('Appointment created:', response.data);
            event.target.reset();
            toast.info("Appointment has been created.")
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message
            toast.error("Error: Appointment could not be created. " + errorMessage)
            console.error('Error creating appointment:', errorMessage);
        }
    };

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

    return (
        <DefaultLayout>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3 justify-center">
                    <div className="my-3">
                        <div className="flex items-center gap-2 text-foreground">
                            <Calendar03Icon color="foreground" />
                            <span className="font-bold text-3xl">Add New Appointment</span>
                        </div>
                        <span className="text-lg text-foreground-400">Enter customer details</span>
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
                            isInvalid={!validationState.firstName}
                            errorMessage="Please enter first name"
                        />

                        <Input
                            type="text"
                            label="Customer Last Name"
                            placeholder="Doe"
                            variant="faded"
                            isRequired
                            startContent={<UserIcon width="20" />}
                            name="lastName"
                            isInvalid={!validationState.lastName}
                            errorMessage="Please enter last name"
                        />
                    </div>

                    <Input
                        type="phone"
                        label="Phone"
                        placeholder="1234567890"
                        variant="faded"
                        isRequired
                        startContent={<Call02Icon width="20" />}
                        name="phone"
                        isInvalid={!validationState.phone}
                        errorMessage="Phone number must be of 10 digits"
                    />

                    <Select
                        label="Stylist"
                        variant="faded"
                        startContent={<MagicWand01Icon width="20" />}
                        name="stylist"
                        isInvalid={!validationState.stylist}
                        errorMessage="Please select a stylist"
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
                        isInvalid={!validationState.service}
                        errorMessage="Please select a service"
                    >
                        {services.map((service) => (
                            <SelectItem key={service.key} value={service.label}>
                                {service.label}
                            </SelectItem>
                        ))}
                    </Select>

                    <div className="flex gap-2">
                        <DatePicker variant="faded"
                            label="Appointment Date"
                            name="appointmentDate"
                            isInvalid={!validationState.appointmentDate}
                            errorMessage="Please select an appointment date"
                        />

                        <TimeInput
                            label="Appointment Time"
                            variant="faded"
                            name="appointmentTime"
                            isInvalid={!validationState.appointmentTime}
                            errorMessage="Please select an appointment time"
                            className={!validationState.appointmentTime ? 'error-input' : ''}
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
        </DefaultLayout>
    );
}
