import { useNavigate } from "react-router-dom";

const SessionOut = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("user");
    navigate("/sign-in");
  };
  return (
    <div
  className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
  style={{ zIndex: 1050 }}
>
  <div className="bg-white rounded shadow-lg" style={{ width: "75vh" }}>
    <div className="p-4">
      <div className="d-flex align-items-center">
        <div className="ms-3">
          <h3 className="fs-4 fw-semibold text-danger">
            Your session has expired.
          </h3>
          <p className="mt-2 text-muted small">
            Please sign in again to continue using the app.
          </p>
        </div>
      </div>
    </div>

    <div className="bg-light px-3 py-2 d-flex justify-content-end">
      <button className="btn btn-secondary" onClick={handleClick} >Sign In</button>
    </div>
  </div>
</div>

  );
};

export default SessionOut;
