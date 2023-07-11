import { Fragment } from "react";

import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation
        isLoggedIn={props.isLoggedIn}
        setIsLoggedIn={props.setIsLoggedIn}
      />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
