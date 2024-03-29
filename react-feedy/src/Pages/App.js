import React, { Component } from "react";

import "../styles/global/Main.css";
import "../styles/independent/App.css";
import logo from "../Images/Logo_2_1600.png";
import dogchilling from "../Images/dog_chilling.png";
import updated from "../Images/updated.png";
import appimage from "../Images/app2.png";
import address from "../Images/address.png";
import DisplayMobileMenu from "../Handlers/DisplayMobileMenu";
import DisplayLoginForm from "../Handlers/DisplayLoginForm";
import DisplayRegisterForm from "../Handlers/DisplayRegisterForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
AOS.init({
  disable: "mobile"
});

const prestate = {
  displayLogin: false,
  displayRegister: false,
  displayMobileMenu: false,
  navbarButtonsDisable: false,
  loginButtonClasses: "button login",
  registerButtonClasses: "button register",
  blurClasses: "outside-not-blur",
  landingContainerClasses: "landing-container",
  informationContainerClasses: "",
  MobileMenuClasses: "mobile-menu",
  MobileMenuIconClasses: "mobile-menu-icon",
  formsClasses: "form-div",
  arrowOpacity: 1
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = prestate;
  }

  resetState() {
    this.setState(prestate);
  }

  render() {
    /*const ChangeOpacityScroll = () => {
      let scrollTop = window.pageYOffset;
      let elmnt = document.getElementById("arrow-div");
      let elementHeight = elmnt.offsetHeight;
      this.setState({
        arrowOpacity: 1 - (scrollTop - elementHeight) / elementHeight
      });
    };*/

    window.onscroll = function() {
      /*ChangeOpacityScroll(); Desativado devido a bug */
    };
    return (
      <div className={this.bodyClasses}>
        <div className={"landing-container " + this.state.blurClasses}>
          <div className="navbar">
            <div className="brand feedy-logo-div">
              <img src={logo} alt="Logo" className="feedy-logo-img"></img>
            </div>
            <div className="form-inline">
              <button
                className={this.state.loginButtonClasses}
                onClick={this.LoginButtonHandlerTrue}
              >
                Entrar
              </button>

              <button
                className={this.state.registerButtonClasses}
                onClick={this.RegisterButtonHandlerTrue}
              >
                Registar
              </button>
              <div className="mobile-menu-icon-div">
                <FontAwesomeIcon
                  icon={faBars}
                  className={this.state.MobileMenuIconClasses}
                  onClick={this.MobileMenuOpen}
                />
              </div>
            </div>
          </div>
          <div className="center-container">
            <div>
              <img
                src={dogchilling}
                alt="Dog chilling"
                className="dog-image"
              ></img>
            </div>
            <div className="title">FeedyVet - Aplicação Web e Móvel</div>
            <div className="subtitle">
              Diminuir distâncias entre veterinários e clientes.
            </div>
          </div>

          {/* Componente que verifica o state, caso seja true, mostra o mobile menu */}
          <DisplayMobileMenu
            getState={this.state.displayMobileMenu}
            getHandlerDown={this.MobileMenuClose}
            getStateClasses={this.state.MobileMenuClasses}
            getLoginHandler={this.LoginButtonHandlerTrue}
            getRegisterHandler={this.RegisterButtonHandlerTrue}
          />

          {/* Componente que verifica o state, caso seja true, mostra o login form */}
          <DisplayLoginForm
            getState={this.state.displayLogin}
            getHandlerDown={this.LogginButtonHandlerFalse}
            getHeight={350}
            getStateClasses={this.state.formsClasses}
          />

          {/* Componente que verifica o state, caso seja true, mostra o register form */}
          <DisplayRegisterForm
            getState={this.state.displayRegister}
            getHandlerDown={this.RegisterButtonHandlerFalse}
            getHeight={350}
            getStateClasses={this.state.formsClasses}
          />

          <div
            className="arrow-div"
            id="arrow-div"
            style={{ opacity: this.state.arrowOpacity }}
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </div>
        </div>
        <div className={"information-container " + this.state.blurClasses}>
          <div
            className="left-column"
            data-aos="fade-right"
            data-aos-easing="ease-in-out"
          >
            <div className="info-text-container">
              <div className="info-main-text">Sempre ao teu dispor</div>
              <div className="info-sub-text">
                Gestão e notificações dos teus animais no teu telemóvel.
                <br />
                Acede ao menu do teu amigo de quatro patas facilmente.
              </div>
            </div>
          </div>
          <div className="right-column">
            <img
              src={updated}
              alt="Updated"
              className="info-image"
              data-aos="fade-left"
              data-aos-easing="ease-in-out"
            ></img>
          </div>
        </div>

        <div className={"information-container " + this.state.blurClasses}>
          <div
            className="left-column-i"
            data-aos="fade-right"
            data-aos-easing="ease-in-out"
          >
            <img src={appimage} alt="App" className="info-image"></img>
          </div>
          <div
            className="right-column-i"
            data-aos="fade-left"
            data-aos-easing="ease-in-out"
          >
            <div className="info-text-container">
              <div className="info-main-text">Simples e prático</div>
              <div className="info-sub-text">
                Sem informação redundante, a aplicação foca-se nos teus animais.
                <br />
                Simples de perceber o funcionamento da App.
                <br />
              </div>
            </div>
          </div>
        </div>

        <div className={"promo-container " + this.state.blurClasses}>
          <div className="container-title">
            <b className="fw400">Veterinários</b>, do que é que estão à espera?
          </div>
          <img
            className="promo-address-image"
            src={address}
            alt="Address"
          ></img>
          <div className="promo-text-main">Vamos trabalhar juntos!</div>
          <div className="promo-text-second">
            <a
              className="text-dec-none"
              href="mailto:duarteribeirodemelo@hotmail.com"
            >
              duarteribeirodemelo@hotmail.com
            </a>
          </div>
        </div>
      </div>
    );
  }

  /* Mudar o state do login para true, de forma a mostrar o form */
  LoginButtonHandlerTrue = () => {
    if (this.state.navbarButtonsDisable === false) {
      if (this.state.displayRegister === false) {
        this.setState({
          displayLogin: true,
          navbarButtonsDisable: true,
          loginButtonClasses:
            this.state.loginButtonClasses + " cursor-not-allowed",
          registerButtonClasses:
            this.state.registerButtonClasses + " cursor-not-allowed",
          MobileMenuIconClasses:
            this.state.MobileMenuIconClasses + " cursor-not-allowed",
          blurClasses: "outside-blur"
        });

        if (window.innerHeight > 350) {
          this.LockScroll(true);
        }
      }
    }
  };
  

  /* Mudar o state do login para false, de forma a mostrar o form */
  LogginButtonHandlerFalse = () => {
    this.setState({
      formsClasses: this.state.formsClasses + " form-div-disappearing",
      blurClasses: prestate.blurClasses
    });

    setTimeout(
      function() {
        if (this.state.navbarButtonsDisable === true) {
          this.resetState();
          this.LockScroll(false);
        }
      }.bind(this),
      400
    );
  };

  /* Mudar o state do register para true, de forma a mostrar o form */
  RegisterButtonHandlerTrue = () => {
    if (this.state.navbarButtonsDisable === false) {
      if (this.state.displayLogin === false) {
        this.setState({
          displayRegister: true,
          navbarButtonsDisable: true,
          loginButtonClasses:
            this.state.loginButtonClasses + " cursor-not-allowed",
          registerButtonClasses:
            this.state.registerButtonClasses + " cursor-not-allowed",
          MobileMenuIconClasses:
            this.state.MobileMenuIconClasses + " cursor-not-allowed",
          blurClasses: "outside-blur"
        });
        if (window.innerHeight > 450) {
          this.LockScroll(true);
        }
      }
    }
  };

  /* Mudar o state do register para false, de forma a mostrar o form */
  RegisterButtonHandlerFalse = () => {
    this.setState({
      formsClasses: this.state.formsClasses + " form-div-disappearing",
      blurClasses: prestate.blurClasses
    });

    setTimeout(
      function() {
        if (this.state.navbarButtonsDisable === true) {
          this.resetState();
          this.LockScroll(false);
        }
      }.bind(this),
      400
    );
  };

  //abrir mobile menu
  MobileMenuOpen = () => {
    this.setState({
      displayMobileMenu: true
    });
    this.LockScroll(true);
  };

  //fechar mobile menu
  MobileMenuClose = () => {
    this.setState({
      MobileMenuClasses:
        this.state.MobileMenuClasses + " mobile-menu-leaving-animation"
    });

    setTimeout(
      function() {
        this.setState({
          displayMobileMenu: false,
          MobileMenuClasses: "mobile-menu"
        });
        this.LockScroll(false);
      }.bind(this),
      400
    );
  };

  //dar lock ao scroll
  LockScroll = varbool => {
    if (varbool === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };
}

export default App;
