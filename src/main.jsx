import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";
import AppContextProvider from "./context/AppContextProvider.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard.jsx";
import ManageStudents from "./pages/ManageStudents.jsx";
import ManageCourses from "./pages/ManageCourses.jsx";
import Add_Update_Student from "./pages/Add_Update_Student.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AppContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="students" element={<ManageStudents />} />
          <Route path="students/add-student" element={<Add_Update_Student />} />
          <Route
            path="students/update-student/:studentId"
            element={<Add_Update_Student />}
          />
          <Route path="courses" element={<ManageCourses />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AppContextProvider>,

  // </StrictMode>
);
