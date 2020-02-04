import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const Login = props => {
  return (
    <div className={props.stateClasses} style={{ height: props.height }}>
      <div className="close-button" onClick={() => props.handlerDown()}>
        <FontAwesomeIcon icon={faTimesCircle} />
      </div>
      <div className="form-title">Estamos quase lá...</div>
      <input
        className="input"
        placeholder="Utilizador"
        style={{ marginTop: 20 }}
      ></input>
      <input
        className="input"
        placeholder="Palavra-passe"
        style={{ marginTop: 15 }}
        type="password"
      ></input>
      <button className="form-login-button">Login</button>
    </div>
  );
};

export default Login;
