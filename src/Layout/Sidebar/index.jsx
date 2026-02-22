import styles from "../Layout.module.css";

const Sidebar = () => {
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
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <a className="nav-link" href="/dashboard">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/students">
                Students
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/courses">
                Courses
              </a>
            </li>
          </ul>
          <hr />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
