import React, { Component } from "react";
import "../styles/global/Main.css";
import logo from "../Images/Logo_2_1600.png";
import "../styles/independent/Admin.css";
import "../styles/independent/Animal.css";
import app from "../firebase";
import moment from "moment";
import AddEventForm from "../Views/AddEventForm";
import RemoveEventForm from "../Views/RemoveEventForm";
import EditEventForm from "../Views/EditEventForm";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

//objetos que fazem parte do state desta página, eventos do passado, presente e futuro. Assim como as classes do seletor de tempo, o estado do component de adicionar e remover eventos, eventid a ser removido
const prestate = {
  pasteventsID: [],
  pasteventsAnimal: [],
  pasteventsComment: [],
  pasteventsDateTime: [],
  pasteventsType: [],
  pasteventsUserID: [],
  pasteventsUserName: [],
  pasteventsState: [],

  presenteventsID: [],
  presenteventsAnimal: [],
  presenteventsComment: [],
  presenteventsDateTime: [],
  presenteventsType: [],
  presenteventsUserID: [],
  presenteventsUserName: [],
  presenteventsState: [],

  futureeventsID: [],
  futureeventsAnimal: [],
  futureeventsComment: [],
  futureeventsDateTime: [],
  futureeventsType: [],
  futureeventsUserID: [],
  futureeventsUserName: [],
  futureeventsState: [],

  addEventView: false,
  removeEventView: false,

  editEventView: false,

  timeSelectPastClasses: "time-select-left-btn",
  timeSelectTodayClasses: "time-select-middle-btn time-select-active",
  timeSelectFutureClasses: "time-select-right-btn",
};

class Admin extends Component {
  constructor(props) {
    super(props);
    //define o state para o prestate, definido acima
    this.state = prestate;
  }

  //reset ao state para o prestate
  resetState() {
    this.setState(prestate);
  }

  redirectToPage = (page) => {
    const { history } = this.props;
    if (history) history.push(page);
  };

  //quando o componente dá load / pagina da load, obtem os eventos passados 10 milisegundos, isto para esperar que o state seja definido
  componentDidMount() {
    let currentComponent = this;
    setTimeout(function () {
      currentComponent.getEvents();
    }, 10);
  }

  redirectToIndexAndLogout = (page) => {
    const { history } = this.props;
    if (history) history.push("/");
    app.auth().signOut();
  };

  redIfRequestCancel = (state) => {
    if (state === "clientrequestedcancel") {
      return <div style={{ color: "red", display: "inline" }}>{state}</div>;
    } else {
      return state;
    }
  };

  //funcao para obter eventos
  getEvents() {
    let currentComponent = this;
    const eventsRef = app
      .firestore()
      .collection("events")
      .orderBy("datetime", "desc");
    var today = moment();

    eventsRef.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        let eventDate = moment(doc.data().datetime);

        let userName;

        app
          .database()
          .ref("users/" + doc.data().UID)
          .once("value")
          .then(function (snapshot) {
            userName = snapshot.val().username;
            console.log(userName);
          });

        setTimeout(function () {
          if (doc.data().state !== "archived") {
            //se data for do passado
            if (eventDate.isBefore(today, "day")) {
              //adiciona a array passado
              currentComponent.setState({
                pasteventsID: currentComponent.state.pasteventsID.concat(
                  doc.id
                ),
                pasteventsAnimal: currentComponent.state.pasteventsAnimal.concat(
                  doc.data().animal
                ),
                pasteventsComment: currentComponent.state.pasteventsComment.concat(
                  doc.data().comment
                ),
                pasteventsDateTime: currentComponent.state.pasteventsDateTime.concat(
                  eventDate.format("DD-MM-YYYY, H:mm")
                ),
                pasteventsType: currentComponent.state.pasteventsType.concat(
                  doc.data().type
                ),
                pasteventsUserID: currentComponent.state.pasteventsUserID.concat(
                  doc.data().UID
                ),
                pasteventsUserName: currentComponent.state.pasteventsUserName.concat(
                  userName
                ),
                pasteventsState: currentComponent.state.pasteventsState.concat(
                  doc.data().state
                ),
              });
            }

            //se data for de hoje
            else if (eventDate.isSame(today, "day")) {
              //adiciona a array de hoje
              currentComponent.setState({
                presenteventsID: currentComponent.state.presenteventsID.concat(
                  doc.id
                ),
                presenteventsAnimal: currentComponent.state.presenteventsAnimal.concat(
                  doc.data().animal
                ),
                presenteventsComment: currentComponent.state.presenteventsComment.concat(
                  doc.data().comment
                ),
                presenteventsDateTime: currentComponent.state.presenteventsDateTime.concat(
                  eventDate.format("DD-MM-YYYY, H:mm")
                ),
                presenteventsType: currentComponent.state.presenteventsType.concat(
                  doc.data().type
                ),
                presenteventsUserID: currentComponent.state.presenteventsUserID.concat(
                  doc.data().UID
                ),
                presenteventsUserName: currentComponent.state.presenteventsUserName.concat(
                  userName
                ),
                presenteventsState: currentComponent.state.presenteventsState.concat(
                  doc.data().state
                ),
              });
            }

            //se data for do futuro
            else if (eventDate.isAfter(today, "day")) {
              //adiciona a array futuro
              currentComponent.setState({
                futureeventsID: currentComponent.state.futureeventsID.concat(
                  doc.id
                ),
                futureeventsAnimal: currentComponent.state.futureeventsAnimal.concat(
                  doc.data().animal
                ),
                futureeventsComment: currentComponent.state.futureeventsComment.concat(
                  doc.data().comment
                ),
                futureeventsDateTime: currentComponent.state.futureeventsDateTime.concat(
                  eventDate.format("DD-MM-YYYY, H:mm")
                ),
                futureeventsType: currentComponent.state.futureeventsType.concat(
                  doc.data().type
                ),
                futureeventsUserID: currentComponent.state.futureeventsUserID.concat(
                  doc.data().UID
                ),
                futureeventsUserName: currentComponent.state.futureeventsUserName.concat(
                  userName
                ),
                futureeventsState: currentComponent.state.futureeventsState.concat(
                  doc.data().state
                ),
              });
            }
          }
        }, 1000);
      });
    });
  }

  render() {
    return (
      <div>
        <a onClick={() => this.redirectToPage("/")}>
          <img
            src={logo}
            alt="Logo"
            className="feedy-logo-img logo-no-index"
          ></img>
        </a>
        <button
          className="button signout-btn"
          onClick={this.redirectToIndexAndLogout}
          style={{ position: "absolute", right: "0", top: "0" }}
        >
          Sair
        </button>
        <div className="background-div"></div>
        <h1 className="events-container-title">Gestão de eventos</h1>
        <div className="time-select-container">
          <button
            className={this.state.timeSelectPastClasses}
            onClick={this.pastClick}
          >
            Passado
          </button>
          <button
            className={this.state.timeSelectTodayClasses}
            onClick={this.todayClick}
          >
            Hoje
          </button>
          <button
            className={this.state.timeSelectFutureClasses}
            onClick={this.futureClick}
          >
            Futuro
          </button>
        </div>
        <div>
          <div className="admin-buttons-div">
            <button
              className="button addEvent"
              onClick={this.changeAddEventViewState}
              style={{ marginBottom: "40px" }}
            >
              Adicionar evento
            </button>
          </div>
          <div>
            {/* Caso os três arrays estejam vazios, ativa o spinner de loading */}
            {this.state.pasteventsID.length === 0 &&
            this.state.presenteventsID.length === 0 &&
            this.state.futureeventsID.length === 0 ? (
              <div className="eventsLoadingContainer">
                <Loader
                  type="TailSpin"
                  color="#3680C1"
                  width={50}
                  height={50}
                />
              </div>
            ) : null}
            {/* Caso o seletor de tempo esteja no passado, mostra eventos do passado */}
            {this.state.timeSelectPastClasses.includes("time-select-active")
              ? this.state.pasteventsID.map((id, index) => (
                  <div className="event-container" key={id}>
                    <div className="event-container-top-child">
                      <div>
                        <div
                          style={{
                            width: "max-content",
                            float: "left",
                            fontSize: "19px",
                            paddingLeft: "20px",
                          }}
                        >
                          {this.state.pasteventsType[index]}
                        </div>
                        <div
                          style={{
                            width: "max-content",
                            float: "right",
                            fontSize: "16px",
                            paddingRight: "20px",
                          }}
                        >
                          {this.state.pasteventsDateTime[index]}h
                        </div>
                      </div>
                      <div
                        style={{
                          clear: "both",
                          paddingLeft: "20px",
                        }}
                      >
                        {this.state.pasteventsComment[index]}
                      </div>
                    </div>
                    <div className="event-container-bottom-child">
                      <div
                        style={{
                          width: "max-content",
                          float: "left",
                          fontSize: "15px",
                          paddingLeft: "20px",
                          marginTop: "10px",
                          bottom: "0",
                        }}
                      >
                        {this.state.pasteventsAnimal[index]} (
                        {this.state.pasteventsUserName[index]}) (
                        {this.redIfRequestCancel(
                          this.state.pasteventsState[index]
                        )}
                        )
                      </div>

                      <button
                        className="event-delete-btn"
                        onClick={() =>
                          this.changeRemoveEventViewState(
                            id,
                            this.state.pasteventsUserName[index],
                            this.state.pasteventsAnimal[index],
                            this.state.pasteventsType[index],
                            this.state.pasteventsComment[index],
                            this.state.pasteventsDateTime[index]
                          )
                        }
                      >
                        <FontAwesomeIcon
                          icon={faTimes}
                          style={{ color: "#fff" }}
                        />
                      </button>
                      <button
                        className="event-edit-btn"
                        onClick={() =>
                          this.changeEditEventViewState(
                            id,
                            this.state.pasteventsUserName[index],
                            this.state.pasteventsAnimal[index],
                            this.state.pasteventsType[index],
                            this.state.pasteventsComment[index],
                            this.state.pasteventsDateTime[index]
                          )
                        }
                      >
                        <FontAwesomeIcon
                          icon={faPencilAlt}
                          style={{ color: "#fff" }}
                        />
                      </button>
                    </div>
                  </div>
                ))
              : null}
            {/* Caso o seletor de tempo esteja no presente, mostra eventos do presente */}
            {this.state.timeSelectTodayClasses.includes("time-select-active")
              ? this.state.presenteventsID.map((id, index) => (
                  <div className="event-container" key={id}>
                    <div className="event-container-top-child">
                      <div>
                        <div
                          style={{
                            width: "max-content",
                            float: "left",
                            fontSize: "19px",
                            paddingLeft: "20px",
                          }}
                        >
                          {this.state.presenteventsType[index]}
                        </div>
                        <div
                          style={{
                            width: "max-content",
                            float: "right",
                            fontSize: "16px",
                            paddingRight: "20px",
                          }}
                        >
                          {this.state.presenteventsDateTime[index]}h
                        </div>
                      </div>
                      <div
                        style={{
                          clear: "both",
                          paddingLeft: "20px",
                        }}
                      >
                        {this.state.presenteventsComment[index]}
                      </div>
                    </div>
                    <div className="event-container-bottom-child">
                      <div
                        style={{
                          width: "max-content",
                          float: "left",
                          fontSize: "15px",
                          paddingLeft: "20px",
                          marginTop: "10px",
                          bottom: "0",
                        }}
                      >
                        {this.state.presenteventsAnimal[index]} (
                        {this.state.presenteventsUserName[index]}) (
                        {this.redIfRequestCancel(
                          this.state.presenteventsState[index]
                        )}
                        )
                      </div>

                      <button
                        className="event-delete-btn"
                        onClick={() =>
                          this.changeRemoveEventViewState(
                            id,
                            this.state.presenteventsUserName[index],
                            this.state.presenteventsAnimal[index],
                            this.state.presenteventsType[index],
                            this.state.presenteventsComment[index],
                            this.state.presenteventsDateTime[index]
                          )
                        }
                      >
                        <FontAwesomeIcon
                          icon={faTimes}
                          style={{ color: "#fff" }}
                        />
                      </button>
                      <button
                        className="event-edit-btn"
                        onClick={() =>
                          this.changeEditEventViewState(
                            id,
                            this.state.presenteventsUserName[index],
                            this.state.presenteventsAnimal[index],
                            this.state.presenteventsType[index],
                            this.state.presenteventsComment[index],
                            this.state.presenteventsDateTime[index]
                          )
                        }
                      >
                        <FontAwesomeIcon
                          icon={faPencilAlt}
                          style={{ color: "#fff" }}
                        />
                      </button>
                    </div>
                  </div>
                ))
              : null}
            {/* Caso o seletor de tempo esteja no futuro, mostra eventos do futuro */}
            {this.state.timeSelectFutureClasses.includes("time-select-active")
              ? this.state.futureeventsID.map((id, index) => (
                  <div className="event-container" key={id}>
                    <div className="event-container-top-child">
                      <div>
                        <div
                          style={{
                            width: "max-content",
                            float: "left",
                            fontSize: "19px",
                            paddingLeft: "20px",
                          }}
                        >
                          {this.state.futureeventsType[index]}
                        </div>
                        <div
                          style={{
                            width: "max-content",
                            float: "right",
                            fontSize: "16px",
                            paddingRight: "20px",
                          }}
                        >
                          {this.state.futureeventsDateTime[index]}h
                        </div>
                      </div>
                      <div
                        style={{
                          clear: "both",
                          paddingLeft: "20px",
                        }}
                      >
                        {this.state.futureeventsComment[index]}
                      </div>
                    </div>
                    <div className="event-container-bottom-child">
                      <div
                        style={{
                          width: "max-content",
                          float: "left",
                          fontSize: "15px",
                          paddingLeft: "20px",
                          marginTop: "10px",
                          bottom: "0",
                        }}
                      >
                        {this.state.futureeventsAnimal[index]} (
                        {this.state.futureeventsUserName[index]}) (
                        {this.redIfRequestCancel(
                          this.state.futureeventsState[index]
                        )}
                        )
                      </div>

                      <button
                        className="event-delete-btn"
                        onClick={() =>
                          this.changeRemoveEventViewState(
                            id,
                            this.state.futureeventsUserName[index],
                            this.state.futureeventsAnimal[index],
                            this.state.futureeventsType[index],
                            this.state.futureeventsComment[index],
                            this.state.futureeventsDateTime[index]
                          )
                        }
                      >
                        <FontAwesomeIcon
                          icon={faTimes}
                          style={{
                            color: "#fff",
                          }}
                        />
                      </button>
                      <button
                        className="event-edit-btn"
                        onClick={() =>
                          this.changeEditEventViewState(
                            id,
                            this.state.futureeventsUserName[index],
                            this.state.futureeventsAnimal[index],
                            this.state.futureeventsType[index],
                            this.state.futureeventsComment[index],
                            this.state.futureeventsDateTime[index]
                          )
                        }
                      >
                        <FontAwesomeIcon
                          icon={faPencilAlt}
                          style={{ color: "#fff" }}
                        />
                      </button>
                    </div>
                  </div>
                ))
              : null}
          </div>

          {/* Caso o state da propriedade addEventView seja true, mostra o addeventform*/}
          {this.state.addEventView === true ? (
            <AddEventForm
              eventsLength={this.state.biggestID}
              turnOffHandler={this.turnOffAddEventViewState}
            />
          ) : null}
          {/* Caso o state da propriedade removeEventView seja true, mostra o removeeventform*/}
          {this.state.removeEventView === true ? (
            <RemoveEventForm
              eventBeingRemoved={this.state.eventBeingRemoved}
              turnOffViewState={this.turnOffRemoveEventViewState}
            />
          ) : null}
          {/* Caso o state da propriedade editEventView seja true, mostra o editeventform*/}
          {this.state.editEventView === true ? (
            <EditEventForm
              eventBeingEdited={this.state.eventBeingEdited}
              turnOffViewState={this.turnOffEditEventViewState}
            />
          ) : null}
        </div>
      </div>
    );
  }

  /*muda o state do addeventview para o contrário, ou seja para true */
  changeAddEventViewState = () => {
    let viewState = this.state.addEventView;
    viewState = !viewState;
    this.setState({
      addEventView: viewState,
    });
  };

  /*muda o state do addeventview para false*/
  turnOffAddEventViewState = () => {
    let viewState = false;
    this.setState({
      addEventView: viewState,
    });
  };

  /*muda o state do removeeventview para true, e passa o id para o eventbeingremoved, que depois é passado para o component de remover evento*/
  changeRemoveEventViewState = (id, username, animal, type, comment, date) => {
    let viewState = this.state.removeEventView;
    viewState = true;
    this.setState({
      removeEventView: viewState,
      eventBeingRemoved: [id, username, animal, type, comment, date],
    });
  };

  /*muda o state do component de remover evento para false*/
  turnOffRemoveEventViewState = () => {
    let viewState = false;
    this.setState({
      removeEventView: viewState,
    });
  };

  changeEditEventViewState = (
    id,
    username,
    animal,
    type,
    comment,
    datetime
  ) => {
    this.setState({
      editEventView: true,
      eventBeingEdited: [id, username, animal, type, comment, datetime],
    });
  };

  turnOffEditEventViewState = () => {
    this.setState({
      editEventView: false,
    });
  };

  //funçao quando seleciona o passado no seletor de tempo
  pastClick = () => {
    if (this.state.timeSelectTodayClasses.includes("time-select-active")) {
      this.setState({
        timeSelectTodayClasses: "time-select-middle-btn",
      });
    }

    if (this.state.timeSelectFutureClasses.includes("time-select-active")) {
      this.setState({
        timeSelectFutureClasses: "time-select-right-btn",
      });
    }

    this.setState({
      timeSelectPastClasses:
        this.state.timeSelectPastClasses + " time-select-active",
    });
  };

  //funçao quando seleciona o presente no seletor de tempo
  todayClick = () => {
    if (this.state.timeSelectPastClasses.includes("time-select-active")) {
      this.setState({
        timeSelectPastClasses: "time-select-left-btn",
      });
    }

    if (this.state.timeSelectFutureClasses.includes("time-select-active")) {
      this.setState({
        timeSelectFutureClasses: "time-select-right-btn",
      });
    }

    this.setState({
      timeSelectTodayClasses:
        this.state.timeSelectTodayClasses + " time-select-active",
    });
  };

  //funçao quando seleciona o futuro no seletor de tempo
  futureClick = () => {
    if (this.state.timeSelectPastClasses.includes("time-select-active")) {
      this.setState({
        timeSelectPastClasses: "time-select-left-btn",
      });
    }

    if (this.state.timeSelectTodayClasses.includes("time-select-active")) {
      this.setState({
        timeSelectTodayClasses: "time-select-middle-btn",
      });
    }

    this.setState({
      timeSelectFutureClasses:
        this.state.timeSelectFutureClasses + " time-select-active",
    });
  };
}

export default Admin;
