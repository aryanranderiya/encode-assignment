import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Calendar } from "@nextui-org/calendar";
import { UserIcon, MagicWand01Icon, Call02Icon, ServiceIcon, NoteEditIcon, Calendar03Icon } from "../components/icons";
import { DateInput, TimeInput } from "@nextui-org/date-input";
import axios from 'axios';
import DefaultLayout from "../layouts/default";
import Sidebar from "../layouts/Sidebar";

export default function AppointmentForm() {
    const [validationState, setValidationState] = useState({
        customerName: true,
        phone: true,
        stylist: true,
        service: true,
        appointmentTime: true,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = {
            customerName: formData.get('customerName'),
            phone: formData.get('phone'),
            stylist: formData.get('stylist'),
            service: formData.get('service'),
            appointmentTime: formData.get('appointmentTime'),
            appointmentDate: formData.get('appointmentDate'),
            notes: formData.get('notes'),
        };

        const fieldsToValidate = ['customerName', 'phone', 'stylist', 'service', 'appointmentTime'];

        // Validate each field
        let isValid = true;
        const nextState = {};

        fieldsToValidate.forEach(field => {
            if (!data[field]) {
                isValid = false;
                nextState[field] = false;
            } else {
                nextState[field] = true;
            }
        });

        setValidationState(nextState);

        if (!isValid) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/createAppointment', data);
            console.log('Appointment created:', response.data);
            event.target.reset();
        } catch (error) {
            console.error('Error creating appointment:', error.response ? error.response.data : error.message);
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
                <div className="flex flex-col gap-5 justify-center">
                    <div className="my-3">
                        <div className="flex items-center gap-2 text-foreground">
                            <Calendar03Icon color="foreground" />
                            <span className="font-bold text-3xl">Add New Appointment</span>
                        </div>
                        <span className="text-lg text-foreground-400">Enter customer details</span>
                    </div>

                    <Input
                        type="text"
                        label="Customer Name"
                        placeholder="John Doe"
                        variant="faded"
                        isRequired
                        startContent={<UserIcon width="20" />}
                        name="customerName"
                        isInvalid={!validationState.customerName}
                        errorMessage="Please enter customer name"
                    />

                    <Input
                        type="phone"
                        label="Phone"
                        placeholder="+91 1234567890"
                        variant="faded"
                        isRequired
                        startContent={<Call02Icon width="20" />}
                        name="phone"
                        isInvalid={!validationState.phone}
                        errorMessage="Please enter a valid phone number"
                        className={!validationState.phone ? 'error-input' : ''}
                    />

                    <Select
                        label="Stylist"
                        variant="faded"
                        startContent={<MagicWand01Icon width="20" />}
                        name="stylist"
                        isInvalid={!validationState.stylist}
                        errorMessage="Please select a stylist"
                        className={!validationState.stylist ? 'error-input' : ''}
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
                        className={!validationState.service ? 'error-input' : ''}
                    >
                        {services.map((service) => (
                            <SelectItem key={service.key} value={service.label}>
                                {service.label}
                            </SelectItem>
                        ))}
                    </Select>

                    <DateInput
                        label="Appointment Date"
                        variant="faded"
                        name="appointmentDate"
                        isInvalid={!validationState.appointmentTime}
                        errorMessage="Please select an appointment date"
                        className={!validationState.appointmentTime ? 'error-input' : ''}
                    />

                    <TimeInput
                        label="Appointment Time"
                        variant="faded"
                        name="appointmentTime"
                        isInvalid={!validationState.appointmentTime}
                        errorMessage="Please select an appointment time"
                        className={!validationState.appointmentTime ? 'error-input' : ''}
                    />

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
                        className="font-medium"
                    >
                        Add new appointment
                    </Button>
                </div>
            </form>
        </DefaultLayout>
    );
}
