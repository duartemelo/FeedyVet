import React, {  Component } from "react";
import app from "../firebase";
import "../styles/global/Main.css";
import "../styles/independent/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faEnvelope,
  faUserCog,
  faColumns
} from "@fortawesome/free-solid-svg-icons";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.getUser(),
      isadmin: this.props.isAdmin
    };
  }

  //direcionar para animal
  redirectToAnimal = () => {
    const { history } = this.props;
    if (history) history.push("/animal");
  };

  //direcionar para contacto
  redirectToContact = () => {
    const { history } = this.props;
    if (history) history.push("/contact");
  };

  //direcionar para perfil
  redirectToProfile = () => {
    const { history } = this.props;
    if (history) history.push("/profile");
  };

  //direcionar para admin
  redirectToAdmin = () => {
    const { history } = this.props;
    if (history) history.push("/admin");
  };

  render() {
    let message = "Olá " + this.state.user + "!";

    return (
      <div>
        <button
          className="button signout-btn"
          onClick={() => app.auth().signOut()}
        >
          Sair
        </button>
        <div className="centered-container">
          <div className="content-container">
            <div className="hello-user">{message}</div>
            <div className="user-menu">
              {/* caso o user nao seja admin, mostra uma serie de botoes, caso seja admin mostra o botao para ir para o painel de admin */}
              {this.state.isadmin === false ? (
                <div>
                  <div
                    className="user-menu-option"
                    style={{ marginRight: 40 }}
                    onClick={this.redirectToAnimal}
                  >
                    <div className="icon-div">
                      <FontAwesomeIcon icon={faPaw} />
                    </div>
                  </div>
                  <div
                    className="user-menu-option"
                    style={{ marginRight: 40 }}
                    onClick={this.redirectToContact}
                  >
                    <div className="icon-div">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                  </div>
                  <div
                    className="user-menu-option"
                    onClick={this.redirectToProfile}
                  >
                    <div className="icon-div">
                      <FontAwesomeIcon icon={faUserCog} />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div
                    className="user-menu-option"
                    style={{ float: "none", margin: "0 auto" }}
                    onClick={this.redirectToAdmin}
                  >
                    <div className="icon-div">
                      <FontAwesomeIcon icon={faColumns} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  //obter o nome do utilizador, removendo o "@mail.com"
  getUser = () => {
    let userVar = app.auth().currentUser.email;
    let getChar = userVar.indexOf("@");
    let userFinal = userVar.slice(0, getChar);
    return userFinal;
  };
}

export default Home;
