import { useState, useRef, useContext, useEffect } from "react";
import LoginContext from "../store/login-context";
import classes from "./AuthForm.module.css";
import { Button } from "react-bootstrap";

const AuthForm = ({ setIsLoggedIn }) => {
  const { handleTokenAdd } = useContext(LoginContext);

  const [isLogin, setIsLogin] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      let response;
      if (isLogin) {
        response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAvBSC-wnMSr4LTyhMGqXtQdczeBxPzacw",
          {
            method: "POST",
            body: JSON.stringify({
              email,
              password,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvBSC-wnMSr4LTyhMGqXtQdczeBxPzacw",
          {
            method: "POST",
            body: JSON.stringify({
              email,
              password,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error.message);
      }

      const data = await response.json();
      const token = data.idToken;
      localStorage.setItem("token", JSON.stringify(token));
      console.log(token);
      setIsLoggedIn(true);
    } catch (error) {
      alert(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleTokenAdd(localStorage.getItem("token"));
  }, [handleTokenAdd]);

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" ref={emailRef} id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" ref={passwordRef} id="password" required />
        </div>
        <div>
          {isLoading ? (
            <p className={classes.loading}>Sending Request...</p>
          ) : (
            <Button variant="light" type="submit">
              {isLogin ? "Login" : "Sign up"}
            </Button>
          )}
        </div>
        <div className={classes.actions}>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
