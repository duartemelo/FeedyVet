import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import logo from "./Images/Logo_2_1600.png";
import dogchilling from "./Images/dog_chilling.png";
import Login from "./Login";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayLogin: false
    };
  }

  render() {
    return (
      <div className="App">
        <div className="navbar">
          <div className="brand feedy-logo-div">
            <img src={logo} alt="Logo" className="feedy-logo-img"></img>
          </div>
          <div className="form-inline">
            <button
              className="button login"
              onClick={this.LoginButtonHandlerTrue}
            >
              Login
            </button>

            <Link to="/register">
              <button className="button register">Registo</button>
            </Link>
          </div>
        </div>
        <div className="center-container">
          <div>
            <img
              src={dogchilling}
              alt="Dog chilling"
              className="dog-image"
            ></img>
          </div>
          <div className="subtitle">
            Uma maneira tecnológica de cuidares dos teus animais.
          </div>
        </div>
        {this.state.displayLogin === true && (
          <Login handlerDown={this.LogginButtonHandlerFalse}>></Login>
        )}
      </div>
    );
  }
  LoginButtonHandlerTrue = () => {
    this.state.displayLogin = true;
    this.forceUpdate();
  };
  LogginButtonHandlerFalse = () => {
    this.state.displayLogin = false;
    this.forceUpdate();
  };
}

export default App;
