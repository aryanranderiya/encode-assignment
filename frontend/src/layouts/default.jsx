import { Navbar } from "../components/navbar";
import Sidebar from "./Sidebar";
import { ScrollArea } from "../components/ui/scroll-area"

export default function DefaultLayout({ children }) {
  return (
    <div className="flex flex-row w-screen overflow-hidden h-screen">
      <div className="sm:flex hidden">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full">
        <Navbar />

        <ScrollArea>
          <main className="py-5 sm:px-14 px-7">
            {children}
          </main>
        </ScrollArea>
      </div>
    </div>
  );
}
