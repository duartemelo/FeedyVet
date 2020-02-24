import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const RegisterForm = (props, { history }) => {
  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div className={props.stateClasses} style={{ height: props.height }}>
      <div className="close-button" onClick={() => props.handlerDown()}>
        <FontAwesomeIcon icon={faTimesCircle} />
      </div>
      <div className="form-title">Bem-vindo!</div>
      <form onSubmit={handleSignUp}>
        <input
          className="input"
          placeholder="Utilizador"
          style={{ marginTop: 20 }}
        ></input>
        <input
          className="input"
          placeholder="E-mail"
          style={{ marginTop: 15 }}
          type="email"
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
        <button type="submit" className="form-login-button">
          Registo
        </button>
      </form>
    </div>
  );
};

export default withRouter(RegisterForm);
