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
      {
        path: "/students",
        element: <ManageStudents />,
        // loader: async () => {
        //   const response = await fetch(
        //     "https://jsonplaceholder.typicode.com/users",
        //   );
        //   const users = await response.json();
        //   const modifiedUsers = users?.map((user) => ({
        //     id: user?.id,
        //     name: user?.name,
        //   }));

        //   return { users: modifiedUsers };
        // },
      },
      { path: "/students/add-student", element: <Add_Update_Student /> },
      { path: "/students/update-student", element: <Add_Update_Student /> },
      { path: "/courses", element: <ManageCourses /> },
    ],
  },
]);

export default router;
