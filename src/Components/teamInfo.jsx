import React, { Component } from "react";
import UserContext from "../Context/UserContext";
import http from "../Services/httpService";
import config from "../config.json";

class teamInfo extends Component {
  static contextType = UserContext;
  state = { team: {} };

  async componentDidMount() {
    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ team: res.data });
        console.log(this.state.team);
        console.log("context", this.context);
        this.context.currentUser.budget = this.state.team.budget;
      });
  }

  render() {
    return (
      <nav className="navbar navbar-light bg-primary">
        <UserContext.Consumer>
          {(UserContext) => (
            <div>
              <h1>
                Hi,
                {UserContext.currentUser ? UserContext.currentUser.name : ""}
              </h1>
              <h1>
                Team ID:
                {UserContext.currentUser ? UserContext.currentUser.teamID : ""}
              </h1>
            </div>
          )}
        </UserContext.Consumer>
      </nav>
    );
  }
}

export default teamInfo;
