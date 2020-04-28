import React, { Component } from "react";
import app from "../firebase";
import "../styles/global/Main.css";
import "../styles/independent/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faEnvelope,
  faUserCog,
  faColumns,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.getUser(),
      isadmin: this.props.isAdmin,
    };
  }

  //redirecionar para pagina, recebe parametro com a página quando chamada
  redirectToPage = (page) => {
    const { history } = this.props;
    if (history) history.push(page);
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
                    onClick={() => this.redirectToPage("/animal")}
                  >
                    <div className="icon-div">
                      <FontAwesomeIcon icon={faPaw} />
                    </div>
                  </div>
                  <div
                    className="user-menu-option"
                    style={{ marginRight: 40 }}
                    onClick={() => this.redirectToPage("/contact")}
                  >
                    <div className="icon-div">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                  </div>
                  <div
                    className="user-menu-option"
                    onClick={() => this.redirectToPage("/profile")}
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
                    style={{ marginRight: 40 }}
                    onClick={() => this.redirectToPage("/admin")}
                  >
                    <div className="icon-div">
                      <FontAwesomeIcon icon={faColumns} />
                    </div>
                  </div>
                  <div
                    className="user-menu-option"
                    style={{ marginRight: 40 }}
                    onClick={() => this.redirectToPage("/adminmessages")}
                  >
                    <div className="icon-div">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                  </div>
                  <div
                    className="user-menu-option"
                    onClick={() => this.redirectToPage("/adminsettings")}
                  >
                    <div className="icon-div">
                      <FontAwesomeIcon icon={faCog} />
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
