import React, { Component } from "react";
import app from "../firebase";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Test</h1>
        <button onClick={() => app.auth().signOut()}>Sign out</button>
      </div>
    );
  }
}

export default Home;
