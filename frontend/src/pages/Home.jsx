import { title } from "../components/primitives";
import { Navbar } from "../components/navbar";
import Sidebar from "../layouts/Sidebar";
import { ScrollArea } from "../components/ui/scroll-area"

export default function Home() {
  return (
    <div className="flex flex-row w-screen overflow-hidden h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <ScrollArea>
          <main className="container max-w-7xl flex-grow p-20">
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
              <div className="inline-block max-w-lg text-center justify-center">
                {/* <h1 className={title()}>About</h1> */}
              </div>
            </section>
          </main>
        </ScrollArea>
      </div>
    </div>
  );
}
