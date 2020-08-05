import React, { Component } from "react";
import http from "../Services/httpService";
import config from "../config.json";
import UserContext from "../Context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import SideBar from "../Components/sideBar";

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
    http
      .get(config.apiEndpoint + "/inbox/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ inbox: res.data });
      });
    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ team: res.data });
      });
  }

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
              Budget: {this.state.team.budget}{" "}
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
                    {inbox.map((inbox) => (
                      <tr key={inbox.inbox_id}>
                        <td>{inbox.sender}</td>
                        <td>{inbox.message}</td>
                        <td>{inbox.stamp}</td>
                      </tr>
                    ))}
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
