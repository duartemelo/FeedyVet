import React, { useState, useContext, useEffect, Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./auth";
import app from "./firebase";
import Loader from "react-loader-spinner";
import "./Loader.css";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  /*const { currentUser } = useContext(AuthContext);*/
  const [user, setUser] = useState(undefined);
  const [admin, setAdmin] = useState(undefined);
  const [userID, setuserID] = useState(undefined);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    app.auth().onAuthStateChanged(function(user) {
      if (user) {
        setUser(user);
        var databaseRef = app.database().ref("users/" + user.uid + "/isadmin");
        databaseRef.on("value", function(snapshot) {
          setAdmin(snapshot.val());
          setuserID(user.uid);
        });
      } else {
        setUser("nouser");
        console.log("No user.");
      }
    });
  }, []);

  return (
    <div>
      {admin === undefined || userID === undefined ? (
        <div class="loader-container">
          <Loader type="TailSpin" color="#3680C1" width={100} height={100} />
        </div>
      ) : (
        <Route
          {...rest}
          render={props =>
            user !== "nouser" ? (
              <RouteComponent {...props} isAdmin={admin} userID={userID} />
            ) : (
              <Redirect to={"/"} />
            )
          }
        />
      )}
    </div>
  );
};

export default PrivateRoute;
