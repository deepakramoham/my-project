import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashBoard from "../pages/DashBoard";
import ManageStudents from "../pages/ManageStudents";
import Add_Update_Student from "../pages/Add_Update_Student";
import ManageCourses from "../pages/ManageCourses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/dashboard", element: <DashBoard /> },
      { path: "/students", element: <ManageStudents /> },
      { path: "/students/add-student", element: <Add_Update_Student /> },
      { path: "/students/update-student", element: <Add_Update_Student /> },
      { path: "/courses", element: <ManageCourses /> },
    ],
  },
]);

export default router;
