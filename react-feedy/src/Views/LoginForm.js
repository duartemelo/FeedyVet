import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import app from "../firebase";
import { AuthContext } from "../auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const LoginForm = props => {
  let history = useHistory();
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/home")
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/home" />;
  }

  return (
    <div className={props.stateClasses} style={{ height: props.height }}>
      <div className="close-button" onClick={() => props.handlerDown()}>
        <FontAwesomeIcon icon={faTimesCircle} />
      </div>
      <div className="form-title">Estamos quase lá...</div>
      <form onSubmit={handleLogin}>
        <input
          className="input"
          placeholder="E-mail"
          style={{ marginTop: 20 }}
          name="email"
          type="email"
        ></input>
        <input
          className="input"
          placeholder="Palavra-passe"
          style={{ marginTop: 15 }}
          name="password"
          type="password"
        ></input>
        <button className="form-login-button" type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
