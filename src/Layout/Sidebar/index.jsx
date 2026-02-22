import styles from "../Layout.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const selectedMenu = location.pathname.split("/").pop();
  return (
    <>
      <aside className={styles.sidebar}>
        <div
          className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark"
          style={{
            position: "sticky",
            top: "0px",
            minHeight: "100vh",
          }}
        >
          <span className="fs-4">Course Master</span>

          <hr />
          <ul className="nav nav-pills flex-column mb-auto ">
            <li className="nav-item">
              <Link
                className={`nav-link text-white ${selectedMenu === "dashboard" ? "active" : ""} `}
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/students"
                className={`nav-link text-white ${selectedMenu === "students" ? "active" : ""} `}
              >
                Students
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                to="/courses"
                className={`nav-link text-white ${selectedMenu === "courses" ? "active" : ""} `}
              >
                Courses
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
