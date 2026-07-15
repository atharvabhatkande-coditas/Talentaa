import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import styles from "./Header.module.scss";
import { navConfig } from "./Header.types";
import Button from "../Button/Button";
import { LogOut, UserRound } from "lucide-react";

const Header = () => {
  const role = useAppSelector((state) => state.auth.role);
  const visibleLinks = navConfig.filter(
    (item) => role && item.allowedRoles.includes(role as any)
  );

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <span className={styles.logo}>Talenta</span>
        <nav className={styles.nav}>
          {visibleLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className={styles.right}>
        <Button variant="ternary_Btn" className={styles.profileBtn}>
          <UserRound size={14}></UserRound>
        </Button>
        <Button variant="primary_Btn" className={styles.logoutBtn}>
          <LogOut size={16} />
          Logout
        </Button>

      </div>

    </header>
  );
};

export default Header;


