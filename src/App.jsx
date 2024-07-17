import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddAppointment from "./pages/AddAppointment";


function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<AddAppointment />} path="/add" />
    </Routes>
  );
}

export default App;
