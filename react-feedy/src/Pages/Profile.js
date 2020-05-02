import React, { Component } from "react";
import "../styles/global/Main.css";
import "../styles/independent/Profile.css";
import app from "../firebase";
import ChangeProfileInfoForm from "../Views/ChangeProfileInfoForm";
import ChangePasswordForm from "../Views/ChangePasswordForm";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userEmail: "",
      changeProfileInfoFormView: false,
      changePasswordFormView: false,
    };
    this.fileInput = React.createRef();
    this.nameInput = React.createRef();
    this.password1Input = React.createRef();
    this.password2Input = React.createRef();
  }

  componentDidMount() {
    let currentComponent = this;
    currentComponent.getUserInfo();
  }

  getUserInfo = () => {
    this.setState({
      userName: app.auth().currentUser.displayName,
      userEmail: app.auth().currentUser.email,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.fileInput.current.files[0] !== undefined) {
      this.imageToFireStorage();
    }
    if (this.nameInput.current.value !== "") {
      this.updateProfileName();
      console.log(this.nameInput.current.value);
    }
    this.closeChangeProfileInfoForm();
    window.location.reload(false);
  };

  imageToFireStorage = () => {
    let currentComponent = this;

    let firstFile = this.fileInput.current.files[0];
    let extension = this.fileInput.current.files[0].type;
    let extensionFinal = "." + extension.split("/")[1];
    let storageRef = app
      .storage()
      .ref("users/" + app.auth().currentUser.uid + extensionFinal);

    storageRef.put(firstFile);

    storageRef = app.storage().ref();

    storageRef
      .child("users/" + app.auth().currentUser.uid + extensionFinal)
      .getDownloadURL()
      .then(function (url) {
        const imageUrl = url;
        currentComponent.updateProfilePicture(imageUrl);
      });
  };

  updateProfilePicture = (url) => {
    app
      .auth()
      .currentUser.updateProfile({
        photoURL: url,
      })
      .then(function () {
        console.log("Update da imagem sucedido");
      })
      .catch(function (error) {
        console.log("Erro ->" + error);
      });
  };

  updateProfileName = () => {
    const newName = this.nameInput.current.value;
    app
      .auth()
      .currentUser.updateProfile({
        displayName: newName,
      })
      .then(function () {
        console.log("Update do nome sucedido");
      })
      .catch(function (error) {
        console.log("Erro ->" + error);
      });
  };

  updatePassword = (event) => {
    event.preventDefault();
    if (
      this.password1Input.current.value === "" ||
      this.password2Input.current.value === ""
    ) {
      alert("Preenche todos os campos.");
    } else if (
      this.password1Input.current.value !== this.password2Input.current.value
    ) {
      alert("Escreve a mesma palavra-passe nos dois campos.");
    } else if (
      this.password1Input.current.value === this.password2Input.current.value
    ) {
      //update pw
      let newPassword = this.password1Input.current.value;
      app
        .auth()
        .currentUser.updatePassword(newPassword)
        .then(
          () => {
            alert("Palavra-passe alterada.");
            this.closeChangePasswordForm();
          },
          (error) => {
            alert("Erro - " + error);
          }
        );
    } else {
      alert("Erro.");
    }
  };

  openChangeProfileInfoForm = () => {
    this.setState({
      changeProfileInfoFormView: true,
    });
  };

  closeChangeProfileInfoForm = () => {
    this.setState({
      changeProfileInfoFormView: false,
    });
  };

  openChangePasswordForm = () => {
    this.setState({
      changePasswordFormView: true,
    });
  };

  closeChangePasswordForm = () => {
    this.setState({
      changePasswordFormView: false,
    });
  };

  render() {
    return (
      <div>
        <button
          className="button signout-btn"
          onClick={() => app.auth().signOut()}
          style={{ position: "absolute", right: "0", top: "0" }}
        >
          Sair
        </button>
        <div className="background-div"></div>
        <div className="under-navbar">
          <h1 className="profile-container-title">Perfil</h1>
          <div className="profile-image-div">
            <img
              src={app.auth().currentUser.photoURL}
              alt="User"
              className="profile-image-img"
            />
          </div>
          <div className="profile-text-info-container">
            <p
              style={{
                display: "block",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              <b>Nome:</b>{" "}
              {this.state.userName === null
                ? "Não definido"
                : this.state.userName}
            </p>
            <p
              style={{
                display: "block",
                margin: "0 auto",
                marginTop: "10px",
                textAlign: "center",
              }}
            >
              <b>E-mail:</b> {this.state.userEmail}
            </p>
            <button
              onClick={this.openChangeProfileInfoForm}
              className="button"
              style={{
                display: "block",
                margin: "0 auto",
                marginTop: "20px",
                width: "200px",
                color: "#fff",
                backgroundColor: "#3680C1",
              }}
            >
              Mudar informações
            </button>
            <button
              onClick={this.openChangePasswordForm}
              className="button"
              style={{
                display: "block",
                margin: "0 auto",
                marginTop: "10px",
                marginBottom: "40px",
                width: "200px",
                color: "#fff",
                backgroundColor: "#DC4141",
              }}
            >
              Alterar palavra-passe
            </button>
          </div>
          {this.state.changeProfileInfoFormView === true ? (
            <ChangeProfileInfoForm
              closeForm={this.closeChangeProfileInfoForm}
              imageInputRef={this.fileInput}
              nameInputRef={this.nameInput}
              submitFunction={this.handleFormSubmit}
            />
          ) : null}

          {this.state.changePasswordFormView === true ? (
            <ChangePasswordForm
              closeForm={this.closeChangePasswordForm}
              password1Input={this.password1Input}
              password2Input={this.password2Input}
              submitFunction={this.updatePassword}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Profile;
