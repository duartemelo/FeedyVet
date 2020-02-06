import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const MobileMenu = props => {
  return (
    <div className={props.stateClasses}>
      <div className="close-button" onClick={() => props.handlerDown()}>
        <FontAwesomeIcon icon={faTimesCircle} />
      </div>
      <div className="mobile-menu-center-buttons">
        <button
          className="mobile-menu-button"
          onClick={() => FormOpen("login")}
        >
          Login
        </button>
        <button
          className="mobile-menu-button"
          onClick={() => FormOpen("register")}
        >
          Registo
        </button>
      </div>
    </div>
  );
  function FormOpen(form) {
    if (form === "login") {
      props.handlerDown();
      setTimeout(function() {
        props.loginHandler();
      }, 400);
    }
    if (form === "register") {
      props.handlerDown();
      setTimeout(function() {
        props.registerHandler();
      }, 400);
    }
  }
};

export default MobileMenu;
