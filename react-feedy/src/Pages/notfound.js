import React from "react";
import image404 from "../Images/undraw_warning_cyit.png";
import "../styles/independent/NotFound.css";
import "../styles/global/Main.css";

const NotFound = () => {
  return (
    <div>
      <div className="centered-container-404">
        <img src={image404} className="image-404"></img>
        <h1>Error 404</h1>
        <h3>Página não encontrada</h3>
      </div>
    </div>
  );
};

export default NotFound;
