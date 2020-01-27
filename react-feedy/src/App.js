import React, { Component } from "react";
import "./App.css";
import logo from "./Images/Logo_2_1600.png";
import dogchilling from "./Images/dog_chilling.png";
import Login from "./Login";
import Register from "./Register";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayLogin: false,
      displayRegister: true,
      loginButtonClasses: "button login",
      registerButtonClasses: "button register"
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
              className={this.state.loginButtonClasses}
              onClick={this.LoginButtonHandlerTrue}
            >
              Login
            </button>

            <button
              className={this.state.registerButtonClasses}
              onClick={this.RegisterButtonHandlerTrue}
            >
              Registo
            </button>
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
            Transmissão de informação facilitada do veterinário para o cliente.
          </div>
        </div>
        {this.state.displayLogin === true && (
          <Login handlerDown={this.LogginButtonHandlerFalse} height={350}>
            >
          </Login>
        )}
        {this.state.displayRegister === true && (
          <Register handlerDown={this.RegisterButtonHandlerFalse} height={450}>
            >
          </Register>
        )}
      </div>
    );
  }
  LoginButtonHandlerTrue = () => {
    if (this.state.displayRegister === false) {
      this.setState({
        displayLogin: true,
        loginButtonClasses:
          this.state.loginButtonClasses + " cursor-not-allowed",
        registerButtonClasses:
          this.state.registerButtonClasses + " cursor-not-allowed"
      });
      this.forceUpdate();
    }
  };
  LogginButtonHandlerFalse = () => {
    this.setState({
      displayLogin: false,
      loginButtonClasses: "button login",
      registerButtonClasses: "button register"
    });
    this.forceUpdate();
  };
  RegisterButtonHandlerTrue = () => {
    if (this.state.displayLogin === false) {
      this.setState({
        displayRegister: true,
        loginButtonClasses:
          this.state.loginButtonClasses + " cursor-not-allowed",
        registerButtonClasses:
          this.state.registerButtonClasses + " cursor-not-allowed"
      });
      this.forceUpdate();
    }
  };
  RegisterButtonHandlerFalse = () => {
    this.setState({
      displayRegister: false,
      loginButtonClasses: "button login",
      registerButtonClasses: "button register"
    });
    this.forceUpdate();
  };
}

export default App;
