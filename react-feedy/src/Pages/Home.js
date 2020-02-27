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
      user: undefined
    };
  }
  render() {

    /*Not working*/
    const getUser = () => {
      var ref = new app("https://feedyvet-dff30.firebaseio.com");
      var authData = ref.getAuth();

      if (authData) {
        this.setState({
          user: authData.provider
        });
      } else {
        console.log("Not logged in");
      }
    };

    return (
      <div>
        <div className="centered-container">
          <div>Hello {this.state.user}</div>
        </div>
        {/*<button onClick={() => app.auth().signOut()}>Sign out</button>*/}
      </div>
    );
  }
}

export default Home;
