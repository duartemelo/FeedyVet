import React, { Component, useCallback } from "react";
import "../styles/global/Main.css";
import "../styles/independent/Admin.css";
import "../styles/independent/Animal.css";
import app from "../firebase";
import moment from "moment";
import AddEventForm from "../Views/AddEventForm";
import RemoveEventForm from "../Views/RemoveEventForm";
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

  presenteventsID: [],
  presenteventsAnimal: [],
  presenteventsComment: [],
  presenteventsDateTime: [],
  presenteventsType: [],
  presenteventsUserID: [],
  presenteventsUserName: [],

  futureeventsID: [],
  futureeventsAnimal: [],
  futureeventsComment: [],
  futureeventsDateTime: [],
  futureeventsType: [],
  futureeventsUserID: [],
  futureeventsUserName: [],

  addEventView: false,
  removeEventView: false,
  eventBeingRemoved: null,

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

  //quando o componente dá load / pagina da load, obtem os eventos passados 10 milisegundos, isto para esperar que o state seja definido
  componentDidMount() {
    let currentComponent = this;
    setTimeout(function () {
      currentComponent.getEvents();
    }, 10);
  }

  //funcao para obter eventos
  getEvents() {
    const db = app.database();
    const ref = db.ref("events");
    let currentComponent = this;

    //data de hoje
    var today = moment();

    ref.orderByChild("datetime").on("child_added", function (snapshot) {
      var eventDate = moment(snapshot.val().datetime);
      eventDate.toDate();

      if (eventDate.isBefore(today, "day")) {
        //adiciona a array passado
        currentComponent.setState({
          pasteventsID: currentComponent.state.pasteventsID.concat(
            snapshot.key
          ),
          pasteventsAnimal: currentComponent.state.pasteventsAnimal.concat(
            snapshot.val().animal
          ),
          pasteventsComment: currentComponent.state.pasteventsComment.concat(
            snapshot.val().comment
          ),
          pasteventsDateTime: currentComponent.state.pasteventsDateTime.concat(
            eventDate.format("DD-MM-YYYY, H:mm")
          ),
          pasteventsType: currentComponent.state.pasteventsType.concat(
            snapshot.val().type
          ),
          pasteventsUserID: currentComponent.state.pasteventsUserID.concat(
            snapshot.val().userID
          ),
          pasteventsUserName: currentComponent.state.pasteventsUserName.concat(
            snapshot.val().userName
          ),
        });
      } else if (eventDate.isSame(today, "day")) {
        //adiciona a array presente
        currentComponent.setState({
          presenteventsID: currentComponent.state.presenteventsID.concat(
            snapshot.key
          ),
          presenteventsAnimal: currentComponent.state.presenteventsAnimal.concat(
            snapshot.val().animal
          ),
          presenteventsComment: currentComponent.state.presenteventsComment.concat(
            snapshot.val().comment
          ),
          presenteventsDateTime: currentComponent.state.presenteventsDateTime.concat(
            eventDate.format("DD-MM-YYYY, H:mm")
          ),
          presenteventsType: currentComponent.state.presenteventsType.concat(
            snapshot.val().type
          ),
          presenteventsUserID: currentComponent.state.presenteventsUserID.concat(
            snapshot.val().userID
          ),
          presenteventsUserName: currentComponent.state.presenteventsUserName.concat(
            snapshot.val().userName
          ),
        });
      } else if (eventDate.isAfter(today, "day")) {
        //adiciona a array futuro
        currentComponent.setState({
          futureeventsID: currentComponent.state.futureeventsID.concat(
            snapshot.key
          ),
          futureeventsAnimal: currentComponent.state.futureeventsAnimal.concat(
            snapshot.val().animal
          ),
          futureeventsComment: currentComponent.state.futureeventsComment.concat(
            snapshot.val().comment
          ),
          futureeventsDateTime: currentComponent.state.futureeventsDateTime.concat(
            eventDate.format("DD-MM-YYYY, H:mm")
          ),
          futureeventsType: currentComponent.state.futureeventsType.concat(
            snapshot.val().type
          ),
          futureeventsUserID: currentComponent.state.futureeventsUserID.concat(
            snapshot.val().userID
          ),
          futureeventsUserName: currentComponent.state.futureeventsUserName.concat(
            snapshot.val().userName
          ),
        });
      }
    });

    /* NEEDS UPDATE */
    /*ref.orderByChild("datetime").on("child_removed", function (snapshot) {
      const removedIndex = currentComponent.state.eventsID.indexOf(
        snapshot.key
      );

      let copiedeventsID = [...currentComponent.state.eventsID];
      let copiedeventsAnimal = [...currentComponent.state.eventsAnimal];
      let copiedeventsDateTime = [...currentComponent.state.eventsDateTime];
      let copiedeventsType = [...currentComponent.state.eventsType];
      let copiedeventsUserID = [...currentComponent.state.eventsUserID];
      let copiedeventsUserName = [...currentComponent.state.eventsUserName];

      copiedeventsID.splice(removedIndex, 1);
      copiedeventsAnimal.splice(removedIndex, 1);
      copiedeventsDateTime.splice(removedIndex, 1);
      copiedeventsType.splice(removedIndex, 1);
      copiedeventsUserID.splice(removedIndex, 1);
      copiedeventsUserName.splice(removedIndex, 1);

      currentComponent.setState({
        eventsID: copiedeventsID,
        eventsAnimal: copiedeventsAnimal,
        eventsDateTime: copiedeventsDateTime,
        eventsType: copiedeventsType,
        eventsUserID: copiedeventsUserID,
        eventsUserName: copiedeventsUserName,
      });
    });*/
  }

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
        <h1 className="events-container-title">Eventos (admin)</h1>
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
                        {this.state.pasteventsAnimal[index]}
                      </div>

                      <button
                        className="event-delete-btn"
                        onClick={() => this.changeRemoveEventViewState(id)}
                      >
                        <FontAwesomeIcon
                          icon={faTimes}
                          style={{ color: "#fff" }}
                        />
                      </button>
                      <button className="event-edit-btn">
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
                        {this.state.presenteventsAnimal[index]}
                      </div>

                      <button
                        className="event-delete-btn"
                        onClick={() => this.changeRemoveEventViewState(id)}
                      >
                        <FontAwesomeIcon
                          icon={faTimes}
                          style={{ color: "#fff" }}
                        />
                      </button>
                      <button className="event-edit-btn">
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
                        {this.state.futureeventsAnimal[index]}
                      </div>

                      <button
                        className="event-delete-btn"
                        onClick={() => this.changeRemoveEventViewState(id)}
                      >
                        <FontAwesomeIcon
                          icon={faTimes}
                          style={{
                            color: "#fff",
                          }}
                        />
                      </button>
                      <button className="event-edit-btn">
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
              eventsLength={this.state.pasteventsID.length + this.state.presenteventsID.length + this.state.futureeventsID.length}
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
  changeRemoveEventViewState = (id) => {
    let viewState = this.state.removeEventView;
    viewState = true;
    this.setState({
      removeEventView: viewState,
      eventBeingRemoved: id,
    });
  };

  /*muda o state do component de remover evento para false*/
  turnOffRemoveEventViewState = () => {
    let viewState = false;
    this.setState({
      removeEventView: viewState,
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
