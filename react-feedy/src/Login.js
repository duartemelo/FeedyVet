import React from "react";

const Login = props => {
  return (
    <div className="form-div" style={{ height: props.height }}>
      <div className="close-button" onClick={() => props.handlerDown()}>
        Fechar
      </div>
      <div className="login-title">Estamos quase lá...</div>
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
