import User from "../components/user/User";
import Map from "../components/map/Map";
import Sidebar from "../components/sidebar/Sidebar";
import styles from "./AppLayout.module.css";
import { useAuth } from "../contexts/FakeAuhContext";

function AppLayout() {
  const { isAuthenticated } = useAuth();
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      {isAuthenticated && <User />}
    </div>
  );
}

export default AppLayout;
