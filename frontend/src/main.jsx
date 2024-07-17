import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { Provider as NextUIProvider } from "./provider.tsx";
import "./index.css";
import { Toaster } from "./components/ui/sonner"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <NextUIProvider>
        <Toaster />
        <App />
      </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
