import "./index.css";
import React from "react";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { Toaster } from "./components/ui/sonner"
import { BrowserRouter } from "react-router-dom";
import { Provider as NextUIProvider } from "./provider.tsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter> {/* React Router*/}
      <NextUIProvider> {/* NextUI component provider */}
        <Toaster /> {/* ShadCN Toaster component */}
        <App />
      </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
