import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import AppContextProvider from "./context/AppContextProvider.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./AppRoutes/Routes.jsx";
import store from "./Redux/store.jsx";
import { Provider } from "react-redux";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
   <Provider store={store}>
  <AppContextProvider>
    <RouterProvider router={router} />
  </AppContextProvider>,
  </Provider>
  // </StrictMode>
);
