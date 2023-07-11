import React, { useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const newPasswordInputRef = useRef();

  const authCxt = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const enteredPassword = newPasswordInputRef.current.value;

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAvBSC-wnMSr4LTyhMGqXtQdczeBxPzacw",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCxt.token,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          ref={newPasswordInputRef}
          id="new-password"
          minLength="7"
        />
      </div>
      <div className={classes.action}>
        <button type="submit">Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
