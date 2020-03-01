import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./auth";
import app from "./firebase";

const AdminRoute = ({ component: RouteComponent, ...rest }) => {
  let userID;
  let getAdmin;
  app.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user);
      userID = user.uid;
      var databaseRef = app.database().ref("users/" + userID + "/isadmin");
      databaseRef.on("value", function(snapshot) {
        getAdmin = snapshot.val();
        console.log(getAdmin);
      });
    } else {
      console.log("No user");
    }
  });

  return (
    <Route
      {...rest}
      render={routeProps =>
        true === true ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/noperms"} />
        )
      }
    />
  );
};

export default AdminRoute;
