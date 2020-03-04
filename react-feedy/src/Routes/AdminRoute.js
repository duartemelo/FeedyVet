import React, { useState, useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../auth";
import app from "../firebase";
import Loader from "react-loader-spinner";
import "../Loader.css";

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
        setgetAdmin("noadmin");
        setuserID("nouser.")
      }
    });
  }, []);

  return (
    <div>
      {userID === undefined || getAdmin === undefined ? (
        <div class="loader-container">
          <Loader type="TailSpin" color="#3680C1" width={100} height={100} />
        </div>
      ) : (
        <Route
          {...rest}
          render={routeProps =>
            getAdmin === true ? (
              <RouteComponent {...routeProps} />
            ) : (
              <Redirect to={"/404"} />
            )
          }
        />
      )}
    </div>
  );
};

export default AdminRoute;
