import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { SnackbarProvider } from "../hook/SnackbarContext.jsx";

createRoot(document.getElementById("root")).render(
  <SnackbarProvider>
    <App />
  </SnackbarProvider>
);
