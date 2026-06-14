import { Outlet } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";

const ErrorBoundaryWrapperRoute = () => {
  return (
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWrapperRoute;
