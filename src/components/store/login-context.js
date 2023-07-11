import React, { createContext, useCallback, useReducer } from "react";

const LoginContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return { ...state, token: action.token };

    case "REMOVE":
      return { ...state, token: null };

    default:
      return state;
  }
};

export const ContextWrapper = (props) => {
  const handleTokenAdd = useCallback((token) => {
    dispatch({ type: "ADD", token });
  }, []);

  const handleTokenRemove = useCallback(() => {
    dispatch({ type: "REMOVE" });
  }, []);

  const [tokenState, dispatch] = useReducer(reducer, {
    token: null,
    storeToken: handleTokenAdd,
    deleteToken: handleTokenRemove,
  });

  return (
    <LoginContext.Provider
      value={{ tokenState, handleTokenAdd, handleTokenRemove }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
