import React from "react";
import RegisterForm from "../Views/RegisterForm";

const DisplayRegister = props => {
  if (props.getState === true) {
    return (
      <RegisterForm
        handlerDown={props.getHandlerDown}
        height={props.getHeight}
        stateClasses={props.getStateClasses}
      ></RegisterForm>
    );
  }
  else{
      return null;
  }
};

export default DisplayRegister;
