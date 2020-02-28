import React, { useCallback, useContext, Component } from "react";
import * as firebase from "firebase";
import app from "../firebase";
import { AuthContext } from "../auth";
import "../App.css";
import "../Home.css";
import { useHistory } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.getUser()
    };
  }

  render() {
    return (
      <div>
        <div className="centered-container">
          <div className="content-container">
            <div className="hello-user">Hello {this.state.user}</div>
            <div className="user-menu">
              <div
                className="user-menu-option"
                style={{ marginRight: 40 }}
              ></div>
              <div className="user-menu-option"></div>
            </div>
          </div>
        </div>
        <button onClick={() => app.auth().signOut()}>Sign out</button>
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
