import { Outlet } from "react-router-dom";
import AppNav from "../app nav/AppNav";
import Footer from "../footer/footer";
import Logo from "../logo/Logo";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet/>
      <Footer/>
    </div>
  );
}

export default Sidebar;
