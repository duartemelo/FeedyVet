import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

/*Pages*/

import App from "./Pages/App";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import Animal from "./Pages/Animal";
import Contact from "./Pages/Contact";
import Profile from "./Pages/Profile";
import NotFound from "./Pages/notfound";
import TestAdminPage from "./Pages/TestAdminPage";
import * as serviceWorker from "./serviceWorker";

import { AuthProvider } from "./auth";

/* Routes */

import PrivateRoute from "./Routes/PrivateRoute";
import AdminRoute from "./Routes//AdminRoute";
import AdminMessages from "./Pages/AdminMessages";
import AdminSettings from "./Pages/AdminSettings";

const routing = (
  <AuthProvider>
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={App} />

          <PrivateRoute exact path="/home" component={Home} />

          <PrivateRoute exact path="/animal" component={Animal} />

          <PrivateRoute exact path="/contact" component={Contact} />

          <PrivateRoute exact path="/profile" component={Profile} />

          <AdminRoute exact path="/admin" component={Admin} />

          <AdminRoute exact path="/testadmin" component={TestAdminPage} />

          <AdminRoute exact path="/adminmessages" component={AdminMessages} />

          <AdminRoute exact path="/adminsettings" component={AdminSettings} />

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
