import React from "react";

const Login = props => {
  return (
    <div className="form-div" style={{ height: props.height }}>
      <div className="close-button" onClick={() => props.handlerDown()}>
        Fechar
      </div>
    </div>
  );
};

export default Login;
