import { Switch, Route } from "react-router-dom";
import { ContextWrapper } from "./components/store/login-context";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ContextWrapper>
      <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} exact>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/auth">
            <AuthPage
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              exact
            />
          </Route>
          <Route path="/profile">
            <UserProfile exact />
          </Route>
        </Switch>
      </Layout>
    </ContextWrapper>
  );
}

export default App;
