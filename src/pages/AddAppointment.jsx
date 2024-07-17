import DefaultLayout from "../layouts/default";
import { Input } from "@nextui-org/input";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { UserIcon, MagicWand01Icon, Call02Icon, ServiceIcon, NoteEditIcon, Calendar03Icon } from "../components/icons"
import { DateInput } from "@nextui-org/date-input";
import { TimeInput } from "@nextui-org/date-input";
import { Time, CalendarDate } from "@internationalized/date";

export default function Home() {

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
            <div className="flex flex-col gap-5 justify-center">

                <div className="my-3">
                    <div className="flex items-center gap-2 text-foreground">
                        <Calendar03Icon color="foreground" />
                        <span className="font-bold text-3xl">Add New Appointment</span>
                    </div>
                    <span className="text-lg text-foreground-400">Enter customer details</span>
                </div>

                <Input type="text" label="Customer Name" placeholder="John Doe" variant="faded" isRequired startContent={<UserIcon width="20" />} />
                <Input type="phone" label="Phone" placeholder="+91 1234567890" variant="faded" isRequired
                    startContent={<Call02Icon width="20" />}
                />
                <Select
                    label="Stylist"
                    isRequired variant="faded"
                    startContent={<MagicWand01Icon width="20" />}
                >
                    {stylists.map((stylist) => (
                        <SelectItem key={stylist.key}>
                            {stylist.label}
                        </SelectItem>
                    ))}
                </Select>

                <Select
                    label="Service"

                    isRequired variant="faded"
                    startContent={<ServiceIcon width="20" />}
                >
                    {services.map((service) => (
                        <SelectItem key={service.key}>
                            {service.label}
                        </SelectItem>
                    ))}
                </Select>

                <DateInput label="Appointment date" placeholderValue={new CalendarDate(1995, 11, 6)} variant="faded" />
                <TimeInput label="Appointment Time" variant="faded" />


                <Textarea
                    label="Notes"
                    placeholder="Enter notes, if any"

                    startContent={<NoteEditIcon width="20" />}
                    variant="faded"
                />

                <Button variant="shadow" color="primary" className="font-medium" >Add new appointment</Button>
            </div>
        </DefaultLayout>
    );
}
