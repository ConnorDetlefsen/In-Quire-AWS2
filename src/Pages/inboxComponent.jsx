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
      message1: [],
      message2: [],
      message3: [],
      message4: [],

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
            "/inventory"
        )
        .then((res) => {
          this.setState({
            inbox: res.data,
            message1: res.data[0],
            message2: res.data[1],
            message3: res.data[2],
            message4: res.data[3],
          });
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
            "/manager"
        )
        .then((res) => {
          this.setState({
            inbox: res.data,

            message1: res.data[0],
            message2: res.data[1],
            message3: res.data[2],
            message4: res.data[3],
          });
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
            "/consultant"
        )
        .then((res) => {
          this.setState({
            inbox: res.data,

            message1: res.data[0],
            message2: res.data[1],
            message3: res.data[2],
            message4: res.data[3],
          });
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
            "/marketing"
        )
        .then((res) => {
          this.setState({
            inbox: res.data,

            message1: res.data[0],
            message2: res.data[1],
            message3: res.data[2],
            message4: res.data[3],
          });
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
    const { inbox, message1, message2, message3, message4 } = this.state;
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
                    {inbox && !message1 && (
                      <tr>
                        <td>{inbox.sender}</td>
                        <td>{inbox.message}</td>
                        <td>{("" + inbox.stamp).substring(0, 10)}</td>
                      </tr>
                    )}
                    {message1 && (
                      <tr>
                        <td>{message1.sender}</td>
                        <td>{message1.message}</td>
                        <td>{("" + message1.stamp).substring(0, 10)}</td>
                      </tr>
                    )}
                    {message2 && (
                      <tr>
                        <td>{message2.sender}</td>
                        <td>{message2.message}</td>
                        <td>{("" + message2.stamp).substring(0, 10)}</td>
                      </tr>
                    )}
                    {message3 && (
                      <tr>
                        <td>{message3.sender}</td>
                        <td>{message3.message}</td>
                        <td>{("" + message3.stamp).substring(0, 10)}</td>
                      </tr>
                    )}
                    {message4 && (
                      <tr>
                        <td>{message4.sender}</td>
                        <td>{message4.message}</td>
                        <td>{("" + message4.stamp).substring(0, 10)}</td>
                      </tr>
                    )}
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
