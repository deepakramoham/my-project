import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import RouteError from "../pages/RouteError";
import SignUp from "../feature/user/SignUp";
import SignIn from "../feature/user/SignIn";
import SessionOut from "../pages/SessionOut";
import Unauthorized from "../pages/Unauthorized";
import RouteProtector from "./RouteProtector";
import ErrorBoundaryWrapperRoute from "./ErrorBoundaryWrapperRoute";
// import Add_Update_Student from "../feature/students/Add_Update_Student";
// import ManageCourses from "../feature/courses/ManageCourses";
import DashBoard from "../pages/DashBoard";
import Loading from "../components/Loading";
// import ManageStudents from "../feature/students/ManageStudents";

import { lazy, Suspense } from "react";

const ManageStudents = lazy(() => import("../feature/students/ManageStudents"));
const ManageCourses = lazy(() => import("../feature/courses/ManageCourses"));
const Add_Update_Student = lazy(
  () => import("../feature/students/Add_Update_Student"),
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <ErrorBoundaryWrapperRoute />,
    children: [
      {
        index: true,
        element: <SignIn />,
        errorElement: <RouteError />,
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
        path: "/unauthorized",
        element: <Unauthorized />,
      },
    ],
  },

  {
    path: "/app",
    element: <App />,
    children: [
      {
        path: "/app/admin",
        element: <RouteProtector role={1100} />,
        children: [
          {
            index: true,
            element: <DashBoard />,
          },
          {
            path: "/app/admin/dashboard",
            element: <DashBoard />,
          },
          {
            path: "/app/admin/students",
            element: (
              <Suspense fallback={<Loading />}>
                <ManageStudents />
              </Suspense>
            ),
          },
          {
            path: "/app/admin/students/add-student",
            element: <Add_Update_Student />,
          },
          {
            path: "/app/admin/students/update-student",
            element: <Add_Update_Student />,
          },
          { path: "/app/admin/courses", element: <ManageCourses /> },
        ],
      },
      {
        path: "/app/user",
        element: <RouteProtector role={1000} />,
        children: [
          { index: true, element: <div>user Dashboard</div> },
          { path: "/app/user/dashboard", element: <div>user Dashboard</div> },
        ],
      },
    ],
  },
]);

export default router;
