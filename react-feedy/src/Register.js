import React from "react";

const Register = props => {
  return (
    <div className="form-div" style={{ height: props.height }}>
      <div onClick={() => props.handlerDown()}>X</div>
    </div>
  );
};

export default Register;
