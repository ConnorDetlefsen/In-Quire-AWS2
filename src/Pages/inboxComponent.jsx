import React, { Component } from "react";
import http from "../Services/httpService";
import config from "../config.json";
import UserContext from "../Context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import SideBar from "../Components/sideBar";
import { Link } from "react-router-dom";

class inboxComponent extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      team: [],
      inbox: [],
    };
  }
  async componentDidMount() {
    const { history } = this.props;

    if (this.context.currentUser.name === null) {
      history.push("/");
    }
    http.get(config.apiEndpoint + "/roundend/1").then((res) => {
      console.log(res);
      if (res.data.roundisover === true) {
        history.push("/");
      }
    });

    if (this.context.currentUser.isInventory === true) {
      http
        .get(
          config.apiEndpoint +
            "/inbox/" +
            this.context.currentUser.teamID +
            "/" +
            this.context.currentUser.round +
            "/Inventory"
        )
        .then((res) => {
          this.setState({ inbox: res.data });
        });
    }
    if (this.context.currentUser.isManager === true) {
      http
        .get(
          config.apiEndpoint +
            "/inbox/" +
            this.context.currentUser.teamID +
            "/" +
            this.context.currentUser.round +
            "/Manager"
        )
        .then((res) => {
          this.setState({ inbox: res.data });
        });
    }

    if (this.context.currentUser.isConsultant === true) {
      http
        .get(
          config.apiEndpoint +
            "/inbox/" +
            this.context.currentUser.teamID +
            "/" +
            this.context.currentUser.round +
            "/Consultant"
        )
        .then((res) => {
          this.setState({ inbox: res.data });
        });
    }
    if (this.context.currentUser.isMarketing === true) {
      http
        .get(
          config.apiEndpoint +
            "/inbox/" +
            this.context.currentUser.teamID +
            "/" +
            this.context.currentUser.round +
            "/Marketing"
        )
        .then((res) => {
          this.setState({ inbox: res.data });
        });
    }

    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ team: res.data });
      });
  }
  //<td>{("" + finances.stamp).substring(11, 19)}</td>
  render() {
    const { inbox } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <div class="d-flex" id="wrapper">
          <SideBar></SideBar>
          <div id="page-content-wrapper">
            <nav className="navbar navbar-dark bg-dark">
              <h1 class="whiteFont">Inbox</h1>
            </nav>
            <nav className="navbar background">
              Budget: {this.state.team.budget} <br />{" "}
              <button class="btn btn-warning">
                <Link class="blackFont" to="/refreshInbox">
                  Refresh Page
                </Link>
              </button>
            </nav>

            <div>
              <center>
                <table class="table">
                  <thead class="thead-light">
                    <tr>
                      <th scope="col">Sender</th>
                      <th scope="col">Message</th>
                      <th scope="col">TimeStamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{inbox.sender}</td>
                      <td>{inbox.message}</td>
                      <td>{("" + inbox.stamp).substring(0, 10)}</td>
                    </tr>
                  </tbody>
                </table>
              </center>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default inboxComponent;
