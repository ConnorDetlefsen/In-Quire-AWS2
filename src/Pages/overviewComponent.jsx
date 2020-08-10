import React, { Component } from "react";
import SideBar from "../Components/sideBar";
import UserContext from "../Context/UserContext";
import http from "../Services/httpService";
import config from "../config.json";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";

class overviewComponent extends Component {
  state = {
    team: [],
    round: 4,
  };
  static contextType = UserContext;

  async componentDidMount() {
    const { history } = this.props;

    if (this.context.currentUser.name === null) {
      history.push("/");
    }

    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        console.log(res);
        this.context.currentUser.budget = res.budget; //using user id right now since the team ids are the same
      });
    http.get(config.apiEndpoint + "/roundend/1").then((res) => {
      console.log(res);
      if (res.data.roundisover === true) {
        history.push("/");
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />

        <div class="d-flex" id="wrapper">
          <SideBar></SideBar>

          <div id="page-content-wrapper">
            <nav className="navbar navbar-dark bg-dark">
              <h1 className="whiteFont">Overview</h1>
              <br></br>
              {this.context.currentUser.isHighestBid === false && (
                <h1 className="orangeFont">
                  Location update! You were outbid!
                </h1>
              )}
            </nav>
            <div className="container">
              <section className="col main">
                <div class="jumbotron" className="back">
                  <center>
                    <h1 class="display-4">
                      <b>Hello, {this.context.currentUser.name}!</b>
                    </h1>
                    <br />
                    <div>
                      <h4>
                        Team ID: {this.context.currentUser.teamID} &emsp; Round:{" "}
                        {this.state.round}
                      </h4>
                    </div>
                    <h4> </h4>
                    <p class="lead">Welcome to In-Quire Simulations!</p>
                    <hr class="my-4" />
                    <p>
                      Welcome to the Business Analytics Simulation! The video
                      below gives a brief overview of the game’s learning
                      objectives and outlines the tasks your team will be
                      assigned each round. Please watch this video before
                      beginning, and reference it to help answer questions
                      throughout the simulation. Good luck!
                    </p>
                    <div>
                      <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/VT50jhB4IBo"
                        frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </div>
                  </center>
                </div>
                <div className="container">
                  <section className="col main">
                    <div class="jumbotron" className="back">
                      <h1 className="title">
                        <center>Walkthrough </center>
                      </h1>
                      <div>
                        <center>
                          <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/0MqulzRXbUA"
                            frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                          ></iframe>
                        </center>
                      </div>
                    </div>
                  </section>
                </div>
              </section>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default overviewComponent;
