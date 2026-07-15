import { Outlet } from "react-router-dom";
import styles from "./Dashboard.module.scss"
import Header from "../../components/Header/Header";

const Dashboard = () => {
  return (
    <div className={styles.layout}>
      <Header/>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;