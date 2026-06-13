import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };
  return (
    <section>
      <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
        style={{ zIndex: 1050 }}
      >
        <div className="bg-white rounded shadow-lg" style={{ width: "75vh" }}>
          <div className="p-4">
            <div className="d-flex align-items-center">
              <div className="ms-3">
                <h3 className="fs-4 fw-semibold text-danger">Unauthorized</h3>
                <p className="mt-2 text-muted small">
                  You do not have access to the requested page.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-light px-3 py-2 d-flex justify-content-end">
            <button className="btn btn-secondary" onClick={handleClick}>
              Back
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Unauthorized;
