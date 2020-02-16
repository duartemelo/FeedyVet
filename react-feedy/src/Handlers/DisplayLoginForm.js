import React from "react";
import LoginForm from "../Views/LoginForm";

const DisplayLogin = props => {
  if (props.getState === true) {
    return (
      <LoginForm
        handlerDown={props.getHandlerDown}
        height={props.getHeight}
        stateClasses={props.getStateClasses}
      ></LoginForm>
    );
  }
  else{
      return null;
  }
};

export default DisplayLogin;
