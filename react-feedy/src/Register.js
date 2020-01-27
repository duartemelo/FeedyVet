import React from "react";

const Register = props => {
  return (
    <div className="form-div" style={{ height: props.height }}>
      <div className="close-button" onClick={() => props.handlerDown()}>
        Fechar
      </div>
      <div className="form-title">Bem-vindo!</div>
      <input
        className="input"
        placeholder="Utilizador"
        style={{ marginTop: 20 }}
      ></input>
      <input
        className="input"
        placeholder="E-mail"
        style={{ marginTop: 15 }}
      ></input>
      <input
        className="input"
        placeholder="Palavra-passe"
        style={{ marginTop: 15 }}
        type="password"
      ></input>
      <input
        className="input"
        placeholder="Confirmar palavra-passe"
        style={{ marginTop: 15 }}
        type="password"
      ></input>
      <button className="form-login-button">Registo</button>
    </div>
  );
};

export default Register;
