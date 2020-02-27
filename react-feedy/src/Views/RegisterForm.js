import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { useHistory } from "react-router-dom";
import app from "../firebase";
import * as firebase from "firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const RegisterForm = props => {
  let history = useHistory();
  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        let userid = app.auth().currentUser.uid;
        await firebase
          .database()
          .ref("/users/" + userid)
          .set({
            isadmin: false
          });
        window.location.reload();
        alert("Registo feito, entre com as credenciais.");
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
          placeholder="E-mail"
          style={{ marginTop: 15 }}
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

        <button type="submit" className="form-login-button">
          Registar
        </button>
      </form>
    </div>
  );
};

export default withRouter(RegisterForm);

/*
<input
          className="input"
          placeholder="Utilizador"
          style={{ marginTop: 20 }}
        ></input>
*/

/* 
<input
          className="input"
          placeholder="Confirmar palavra-passe"
          style={{ marginTop: 15 }}
        ></input>
*/
