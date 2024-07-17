import { Listbox, ListboxSection, ListboxItem } from "@nextui-org/listbox";
import { Calendar03Icon } from "../components/icons";

export default function Sidebar() {

    return <div className="w-[300px] h-screen dark:bg-white dark:bg-opacity-10 bg-black bg-opacity-10 p-3 pt-[65px] flex flex-col">
        <span className="py-3 px-2 font-medium text-sm flex gap-2 items-center">
            <Calendar03Icon width="18" color="foreground" />
            Upcoming Appointments
        </span>

        <div className="w-full max-w-[260px] px-1 py-2 rounded-small bg-black dark:bg-opacity-50  bg-opacity-5  border-default-200 dark:border-default-100">
            <Listbox variant="flat" aria-label="Listbox menu with sections">
                <ListboxSection title="Today" showDivider>
                    <ListboxItem
                        key="new"
                        description="Customer Name"
                    >
                        10:00 PM
                    </ListboxItem>
                </ListboxSection>
                <ListboxSection title="Tomorrow" showDivider>
                    <ListboxItem
                        key="new"
                        description="Customer Name"
                    >
                        10:00 PM
                    </ListboxItem>
                </ListboxSection>
                <ListboxSection title="18th July 24" >
                    <ListboxItem
                        key="new"
                        description="Customer Name"
                    >
                        10:00 PM
                    </ListboxItem>
                </ListboxSection>
            </Listbox>
        </div>
    </div>
}