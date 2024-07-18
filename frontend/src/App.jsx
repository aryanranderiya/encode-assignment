import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AppointmentForm from "./pages/AppointmentForm";
import { AppointmentsProvider } from "./contexts/AppointmentsContext"

export default function App() {
  return (
    <AppointmentsProvider>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<AppointmentForm />} path="/add" />
        <Route element={<AppointmentForm viewonly={true} />} path="/appointment/:id" />
      </Routes>
    </AppointmentsProvider>
  );
}

