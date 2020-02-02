import React, { Component } from "react";
import "./App.css";
import logo from "./Images/Logo_2_1600.png";
import dogchilling from "./Images/dog_chilling.png";
import Login from "./Login";
import Register from "./Register";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayLogin: false,
      displayRegister: false,
      loginButtonClasses: "button login",
      registerButtonClasses: "button register",
      blurClasses: "",
      landingContainerClasses: "landing-container",
      informationContainerClasses: ""
    };
  }

  render() {
    return (
      <div className={this.bodyClasses}>
        <div className={"landing-container " + this.state.blurClasses}>
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
            <div className="title">Veterinários next-level!</div>
            <div className="subtitle">
              Diminuimos distâncias entre os estabelecimentos e os clientes.
            </div>
          </div>
          {this.state.displayLogin === true && (
            <Login handlerDown={this.LogginButtonHandlerFalse} height={350}>
              >
            </Login>
          )}
          {this.state.displayRegister === true && (
            <Register
              handlerDown={this.RegisterButtonHandlerFalse}
              height={450}
            >
              >
            </Register>
          )}
          <div className="arrow-div">
            <FontAwesomeIcon icon={faArrowDown} />
          </div>
        </div>
        <div className={"information-container " + this.state.blurClasses}>
          <div className="container-title">Info</div>
        </div>
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
          this.state.registerButtonClasses + " cursor-not-allowed",
        blurClasses: this.state.blurClasses + "outside-blur"
      });
      this.LockScroll(true);
      this.forceUpdate();
    }
  };
  LogginButtonHandlerFalse = () => {
    this.setState({
      displayLogin: false,
      loginButtonClasses: "button login",
      registerButtonClasses: "button register",

      blurClasses: ""
    });
    this.LockScroll(false);
    this.forceUpdate();
  };
  RegisterButtonHandlerTrue = () => {
    if (this.state.displayLogin === false) {
      this.setState({
        displayRegister: true,
        loginButtonClasses:
          this.state.loginButtonClasses + " cursor-not-allowed",
        registerButtonClasses:
          this.state.registerButtonClasses + " cursor-not-allowed",
        blurClasses: this.state.blurClasses + "outside-blur"
      });
      this.LockScroll(true);
      this.forceUpdate();
    }
  };
  RegisterButtonHandlerFalse = () => {
    this.setState({
      displayRegister: false,
      loginButtonClasses: "button login",
      registerButtonClasses: "button register",

      blurClasses: ""
    });
    this.LockScroll(false);
    this.forceUpdate();
  };
  LockScroll = varbool => {
    if (varbool === true && window.innerHeight > 500) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };
}

export default App;
