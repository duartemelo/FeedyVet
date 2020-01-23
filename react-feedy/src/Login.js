import React from "react";

const Login = (props) => {
  return (
    <div className="form-div">
      <div onClick={() => props.handlerDown()}>X</div>
    </div>
  );
};

export default Login;
