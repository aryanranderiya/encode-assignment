import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import AppointmentForm from "./pages/AppointmentForm";
import { AppointmentsProvider } from "./contexts/AppointmentsContext"

export default function App() {
  return (
    <AppointmentsProvider> {/* Global appointments Context provider */}
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<AppointmentForm />} path="/add" />
        <Route element={<AppointmentForm viewonly={true} />} path="/appointment/:id" /> {/* Read-only mode route */}
      </Routes>
    </AppointmentsProvider>
  );
}