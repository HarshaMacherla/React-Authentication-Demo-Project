import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = (props) => {
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/auth">Login</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            {props.isLoggedIn && (
              <button onClick={() => props.setIsLoggedIn(false)}>Logout</button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
