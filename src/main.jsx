import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";
import AppContextProvider from "./context/AppContextProvider.jsx";
import store from "./redux/store.jsx";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </Provider>

  // </StrictMode>
);
