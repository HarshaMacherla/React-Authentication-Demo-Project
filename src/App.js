import { Switch, Route, Redirect } from "react-router-dom";
import AuthContext from "./store/auth-context";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { useContext } from "react";

function App() {
  const authCxt = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!authCxt.isLoggedIn && (
          <Route path="/auth" exact>
            <AuthPage />
          </Route>
        )}

        <Route path="/profile" exact>
          {authCxt.isLoggedIn && <UserProfile />}
          {!authCxt.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
