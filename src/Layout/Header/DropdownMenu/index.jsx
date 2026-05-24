import { useNavigate } from "react-router-dom";
import styles from "./DropdownMenu.module.css";
import { useDispatch } from "react-redux";
import { signOut } from "../../../feature/user/userSlice";
const DropDownMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(signOut());
    navigate("/sign-in");
  };
  return (
    <div
      style={{
        position: "fixed",
        top: "70px",
        right: "5px",
        width: "9em",
        display: "flex",
        justifyContent: "center",
        zIndex: "10",
      }}
    >
      <ul className="list-group" style={{ width: "100%", textAlign: "center" }}>
        <li className={`list-group-item ${styles["menu-options"]}`}>Profile</li>

        <li
          className={`list-group-item ${styles["menu-options"]}`}
          onClick={handleLogout}
        >
          Sign out
        </li>
      </ul>
    </div>
  );
};

export default DropDownMenu;
