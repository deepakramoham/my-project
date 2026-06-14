import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import ErrorBoundary from "../components/ErrorBoundary";

const Layout = () => {
  const sideBarRef = useRef(null);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  console.log(sideBarRef);
  const handleClick = ({ target }) => {
    if (!sideBarRef || !sideBarOpen || sideBarRef?.current?.contains(target))
      return;
    setSideBarOpen(!sideBarOpen);
  };
  return (
    <>
      <div className={styles.container} onClick={handleClick}>
        <Sidebar sideBarRef={sideBarRef} sideBarOpen={sideBarOpen} />
        <Header sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
