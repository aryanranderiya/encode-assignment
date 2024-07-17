import { Link } from "@nextui-org/link";
import { Chip } from "@nextui-org/react";
import { Navbar } from "../components/navbar";

export default function DefaultLayout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="flex justify-center py-3">
        
        <Link
          isExternal
          className="weight"
          href="https://aryanranderiya.com"
          title="nextui.org homepage"
        >  <Chip color="primary" variant="dot">  
            Made by Aryan Randeriya
            </Chip>

        
        </Link>
      </footer>
    </div>
  );
}
