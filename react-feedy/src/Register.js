import React from "react";

const Register = props => {
  return (
    <div className="form-div register-form" style={{ height: props.height }}>
      <div className="close-button" onClick={() => props.handlerDown()}>
        Fechar
      </div>
    </div>
  );
};

export default Register;
