import React, { useState, useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./auth";
import app from "./firebase";

const AdminRoute = ({ component: RouteComponent, ...rest }) => {
  const [userID, setuserID] = useState(undefined);
  const [getAdmin, setgetAdmin] = useState(undefined);

  useEffect(() => {
    app.auth().onAuthStateChanged(function(user) {
      if (user) {
        setuserID(user.uid);
        var databaseRef = app.database().ref("users/" + user.uid + "/isadmin");
        databaseRef.on("value", function(snapshot) {
          setgetAdmin(snapshot.val());
        });
      } else {
        console.log("No user");
      }
    });
  }, []);

  return (
    <div>
      {getAdmin === undefined ? (
        <h2>Loading perms</h2>
      ) : (
        <Route
          {...rest}
          render={routeProps =>
            getAdmin === true ? (
              <RouteComponent {...routeProps} />
            ) : (
              <Redirect to={"/"} />
            )
          }
        />
      )}
    </div>
  );
};

export default AdminRoute;
