import { Link } from "@nextui-org/link";
import { Chip } from "@nextui-org/react";
import { Navbar } from "../components/navbar";
import Sidebar from "./Sidebar";

export default function DefaultLayout({ children }) {
  return (
    <div className="flex flex-row w-screen overflow-hidden h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />

        <main className="container max-w-7xl flex-grow p-20">
          {children}
        </main>

        <footer className="flex justify-center py-4 fixed bottom-0 left-0 w-full backdrop-blur-sm" >
          <Link
            isExternal
            href="https://aryanranderiya.com"
          >
            <Chip color="primary" variant="dot" className="font-bold">
              Made by Aryan Randeriya</Chip>
          </Link>
        </footer>
      </div>
    </div>
  );
}
