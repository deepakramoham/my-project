import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Unauthorized from "../pages/Unauthorized";
import { Navigate } from "react-router-dom";

const RouteProtector = ({ role }) => {
  const { user } = useSelector((state) => state.userState);

  const { accessToken, role: userRole } = user || {};

  return accessToken && userRole === role ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" />
  );
};

export default RouteProtector;
