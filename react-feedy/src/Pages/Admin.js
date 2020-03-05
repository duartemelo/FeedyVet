import React, { Component } from "react";
import "../styles/global/Main.css";
import app from "../firebase";

class Admin extends Component {
  render() {
    const db = app.database();
    var ref = db.ref("events");
    ref.orderByChild("datetime").on("child_added", function(snapshot) {
      console.log(
        "The key is: " +
          snapshot.key +
          " and the userID is " +
          snapshot.val().userID +
          " and the type of event is " +
          snapshot.val().type
      );
    });
    return (
      <div>
        <h1>Admin Panel</h1>
        <div>Send something</div>
      </div>
    );
  }
}

export default Admin;
