import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import logo from "./Images/Logo_2_1600.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = "";
  }
  render() {
    return (
      <div className="App">
        <div className="navbar">
          <div className="brand feedy-logo-div">
            <img src={logo} alt="Logo" className="feedy-logo-img"></img>
          </div>
          <div className="form-inline">
            <Link to="/login">
              <button className="button login">Login</button>
            </Link>
            <Link to="/register">
              <button className="button register">Registo</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
