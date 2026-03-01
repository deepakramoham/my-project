import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import AppContextProvider from "./context/AppContextProvider.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./AppRoutes/Routes.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AppContextProvider>
    <RouterProvider router={router} />
  </AppContextProvider>,
  // </StrictMode>
);
