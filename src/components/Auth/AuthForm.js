import { useState, useRef, useContext } from "react";
import classes from "./AuthForm.module.css";
import { Button } from "react-bootstrap";
import AuthContext from "../../store/auth-context";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const authCxt = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    let url;
    try {
      let response;
      if (isLogin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAvBSC-wnMSr4LTyhMGqXtQdczeBxPzacw";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvBSC-wnMSr4LTyhMGqXtQdczeBxPzacw";
      }

      response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error.message);
      }

      const data = await response.json();
      const token = data.idToken;
      console.log(token);
      authCxt.login(token);
    } catch (error) {
      alert(error.message);
    }
    setIsLoading(false);
  };

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
              {isLogin ? "Login" : "Create Account"}
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
