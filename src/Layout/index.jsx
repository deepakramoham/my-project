import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

const Layout = () => {
  return (
    <>
      <div className={styles.container}>
        <Sidebar />
        <Header />

        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
