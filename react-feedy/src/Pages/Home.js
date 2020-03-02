import React, { useCallback, useContext, Component } from "react";
import * as firebase from "firebase";
import app from "../firebase";
import { AuthContext } from "../auth";
import "../App.css";
import "../Home.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faEnvelope,
  faUserCog
} from "@fortawesome/free-solid-svg-icons";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.getUser()
    };
  }

  render() {
    
    let message = "Olá " + this.state.user + "!";

    return (
      <div>
        <div className="centered-container">
          <div className="content-container">
            <div className="hello-user">{message}</div>
            <div className="user-menu">
              <div className="user-menu-option" style={{ marginRight: 40 }}>
                <div className="icon-div">
                  <FontAwesomeIcon icon={faPaw} />
                </div>
              </div>
              <div className="user-menu-option" style={{ marginRight: 40 }}>
                <div className="icon-div">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
              </div>
              <div className="user-menu-option">
                <div className="icon-div">
                  <FontAwesomeIcon icon={faUserCog} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="button signout-btn"
          onClick={() => app.auth().signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }

  getUser = () => {
    let userVar = app.auth().currentUser.email;
    let getChar = userVar.indexOf("@");
    let userFinal = userVar.slice(0, getChar);
    return userFinal;
  };
}

export default Home;
