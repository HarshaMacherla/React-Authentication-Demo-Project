import { useRef, useState } from "react";
import { Button } from "react-bootstrap";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [sendingSignUpRequest, setSendingSignUpRequest] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleCreateAccount = async (event) => {
    event.preventDefault();
    setSendingSignUpRequest(true);

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvBSC-wnMSr4LTyhMGqXtQdczeBxPzacw",
        {
          method: "POST",
          body: JSON.stringify({ email, password, returnSecureToken: true }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (!response.ok) {
          const errorData = await response.json();
          const errorMessage = errorData.error.message;
          alert(errorMessage);
        }
      }

      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
    setSendingSignUpRequest(false);
  };

  // const handleSignin = async (event) => {
  //   event.preventDefault();
  //   const email = emailRef.current.value;
  //   const password = passwordRef.current.value;

  //   try {
  //     const response = await fetch(
  //       "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvBSC-wnMSr4LTyhMGqXtQdczeBxPzacw",
  //       {
  //         method: "POST",
  //         body: JSON.stringify({ email, password, returnSecureToken: true }),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  //   setSendingSignUpRequest(false);
  // };

  const loading = <p className={classes.loading}>Sending Request...</p>;

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div>
          {!sendingSignUpRequest && isLogin && (
            <Button variant="light">Login</Button>
          )}
          {!sendingSignUpRequest && !isLogin && (
            <Button variant="light" onClick={handleCreateAccount}>
              Sign Up
            </Button>
          )}
          {sendingSignUpRequest && !isLogin && loading}
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
