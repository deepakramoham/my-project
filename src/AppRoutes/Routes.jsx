import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashBoard from "../pages/DashBoard";
import ManageStudents from "../feature/students/ManageStudents";
import Add_Update_Student from "../feature/students/Add_Update_Student";
import ManageCourses from "../feature/courses/ManageCourses";
import RouteError from "../pages/RouteError";
import SignUp from "../feature/user/SignUp";
import SignIn from "../feature/user/SignIn";
import SessionOut from "../pages/SessionOut";
const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/session-expired",
    element: <SessionOut />,
  },
  {
    path: "/",
    element: <App />,
    errorElement: <RouteError />,
    children: [
      { path: "/dashboard", element: <DashBoard /> },
      {
        path: "/students",
        element: <ManageStudents />,
      },
      { path: "/students/add-student", element: <Add_Update_Student /> },
      { path: "/students/update-student", element: <Add_Update_Student /> },
      { path: "/courses", element: <ManageCourses /> },
    ],
  },
]);

export default router;
