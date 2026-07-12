import styles from "../Layout.module.css";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ sideBarRef, sideBarOpen }) => {
 
  const { role } = useSelector((state) => state?.userState?.user);

  return (
    <>
      <aside
        ref={sideBarRef}
        className={`${sideBarOpen ? `${styles.sidebar} ${styles.active}` : `${styles.sidebar}`}`}
      >
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
            {role === 1100 ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link text-white ${isActive ? "active" : ""} `
                    }
                    to="/app/admin/dashboard"
                    end
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link text-white ${isActive ? "active" : ""} `
                    }
                    to="/app/admin/students"
                  >
                    Students
                  </NavLink>
                </li>
                <li className="nav-item ">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link text-white ${isActive ? "active" : ""} `
                    }
                    to="/app/admin/courses"
                  >
                    Courses
                  </NavLink>
                </li>
              </>
            ) : role === 1000 ? (
              <li className="nav-item ">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link text-white ${isActive ? "active" : ""} `
                  }
                  to="/app/user/dashboard"
                >
                  Dashboard
                </NavLink>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
