import { Link } from "@nextui-org/link";
import { Chip } from "@nextui-org/react";
import { Navbar } from "../components/navbar";
import Sidebar from "./Sidebar";
import { ScrollArea } from "../components/ui/scroll-area"

export default function DefaultLayout({ children }) {
  return (
    <div className="flex flex-row w-screen overflow-hidden h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />

        <ScrollArea>
          <main className="container max-w-7xl flex-grow p-20">
            {children}
          </main>
        </ScrollArea>
      </div>
    </div>
  );
}
