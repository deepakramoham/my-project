import styles from "../Layout.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className="navbar bg-body-tertiary" style={{ height: "4rem" }}></nav>
    </header>
  );
};
export default Header;
