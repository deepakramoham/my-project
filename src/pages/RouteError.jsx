import { useRouteError } from "react-router-dom";

const RouteError = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="min-vh-100">
      <div className="d-flex justify-content-center align-items-center">
        <div>{error.status}</div>
        <div>{error.statusText}</div>
      </div>
    </div>
  );
};

export default RouteError;
