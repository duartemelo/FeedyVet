import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./Pages/App";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import TestAdminPage from "./Pages/TestAdminPage";
import * as serviceWorker from "./serviceWorker";
import NotFound from "./notfound";
import { AuthProvider } from "./auth";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";


const routing = (
  <AuthProvider>
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={App} />

          <PrivateRoute exact path="/home" component={Home} />

          <AdminRoute exact path="/admin" component={Admin} />

          <AdminRoute exact path="/testadmin" component={TestAdminPage} />

          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  </AuthProvider>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
