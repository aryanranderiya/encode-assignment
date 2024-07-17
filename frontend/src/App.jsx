import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AppointmentForm from "./pages/AppointmentForm";

function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<AppointmentForm />} path="/add" />
      <Route element={<AppointmentForm viewonly={true} />} path="/appointment/:id" />
    </Routes>
  );
}

export default App;
