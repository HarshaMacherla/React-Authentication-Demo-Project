import AuthForm from "../components/Auth/AuthForm";

const AuthPage = (props) => {
  return (
    <AuthForm
      isLoggedIn={props.isLoggedIn}
      setIsLoggedIn={props.setIsLoggedIn}
    />
  );
};

export default AuthPage;
