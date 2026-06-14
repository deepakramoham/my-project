import styles from "../Layout.module.css";
import { FaUserCircle } from "react-icons/fa";
import DropDownMenu from "./DropdownMenu";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = ({ sideBarOpen, setSideBarOpen }) => {
  const [dropDownOpen, setDropdownOpen] = useState(false);

  return (
    <header className={styles.header}>
      <nav className="navbar bg-body-tertiary" style={{ minHeight: "3rem" }}>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "end",
            paddingRight: "1.5em",
          }}
        >
          <div className={styles["hamburger-container"]}>
            <GiHamburgerMenu
              style={{ fontSize: "3rem" }}
              onClick={() => setSideBarOpen(!sideBarOpen)}
            />
          </div>

          <div>
            <FaUserCircle
              style={{ fontSize: "3rem", cursor: "pointer" }}
              onClick={() => {
                setDropdownOpen(!dropDownOpen);
              }}
            />
          </div>
        </div>
      </nav>

      {dropDownOpen && <DropDownMenu />}
    </header>
  );
};

export default Header;
