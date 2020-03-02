import React, { useState, useContext, useEffect, Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./auth";
import app from "./firebase";
import Loader from "react-loader-spinner";
import "./Loader.css";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  /*const { currentUser } = useContext(AuthContext);*/
  const [user, setUser] = useState(undefined);
  const [redirect, setRedirect] = useState(false);

  


  useEffect(() => {
    app.auth().onAuthStateChanged(function(user) {
      if (user) {
        setUser(user);
      } else {
        setUser("nouser")
        console.log("No user.");
      }
    });
  }, []);

  

  return (
    <div>
      {user === undefined ? (
        <div class="loader-container">
          <Loader type="TailSpin" color="#3680C1" width={100} height={100} />
        </div>
      ) : (
        <Route
          {...rest}
          render={routeProps =>
            user !== "nouser" ? <RouteComponent {...routeProps} /> : <Redirect to={"/"} />
          }
        />
      )}
    </div>
  );
};

export default PrivateRoute;
