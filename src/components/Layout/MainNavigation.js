import { Link } from "react-router-dom";
import LoginContext from "../store/login-context";
import classes from "./MainNavigation.module.css";
import { useContext } from "react";

const MainNavigation = (props) => {
  const { handleTokenRemove } = useContext(LoginContext);

  const handleLogout = () => {
    handleTokenRemove();
    props.setIsLoggedIn(false);
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>{!props.isLoggedIn && <Link to="/auth">Login</Link>}</li>
          <li>{props.isLoggedIn && <Link to="/profile">Profile</Link>}</li>
          <li>
            <Link to="/auth">
              {props.isLoggedIn && (
                <button onClick={handleLogout}>Logout</button>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
