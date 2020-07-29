import React, { Component } from "react";
import UserContext from "../Context/UserContext";
import http from "../Services/httpService";
import config from "../config.json";
import Navbar from "../Components/Nav";

//const test = "S3_test.pdf";
const txt = "S3_pull.txt";

class buyDataForm extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      team: [],
      cost: 0,
      marketingData: false,
      populationData: false,
      competitorData: false,
    };
  }

  async componentDidMount() {
    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ team: res.data });
        console.log(res);
      });
  }

  budgetUpdate = async (team) => {
    const cost1 = this.state.cost;
    const budget = this.context.currentUser.budget; // used to set api team.budget

    team.budget = parseInt(budget, 10) - parseInt(cost1, 10);

    this.context.currentUser.budget = team.budget; //updates the context

    const { data } = await http.put(
      config.apiEndpoint + "/team/" + this.context.currentUser.teamID,
      team
    );
    console.log(data);
  };

  handleClick = (e) => {
    this.state.cost = e.target.value;
    console.log(this.state.cost);
    this.budgetUpdate(this.state.team);

    if (e.target.name === "marketing") {
      this.setState({ marketingData: true });
    }
    if (e.target.name === "population") {
      this.setState({ populationData: true });
    }
    if (e.target.name === "competitor") {
      this.setState({ competitorData: true });
    }
  };

  render() {
    const { team } = this.state;
    return (
      <React.Fragment>
        <Navbar />
        <nav className="navbar navbar-light bg-primary">
          Budget: {team.budget}{" "}
        </nav>
        <h1>{this.state.marketingData}</h1>

        <div class="row">
          <div class="column">
            <div class="card">
              Marketing Data: $1,000
              <button
                type="button"
                onClick={this.handleClick}
                class="btn btn-primary"
                value="1000"
                name="marketing"
              >
                Puchase
              </button>
              {this.state.marketingData === true && (
                <a
                  href={
                    "https://inquire-team" +
                    this.context.currentUser.teamID +
                    ".s3-us-west-1.amazonaws.com/" +
                    txt
                  }
                  download
                >
                  Data Download
                </a>
              )}
            </div>
          </div>
          <div class="column">
            <div class="card">
              Population Data: $1,500
              <button
                type="button"
                onClick={this.handleClick}
                class="btn btn-primary"
                value="1500"
                name="population"
              >
                Puchase
              </button>
              {this.state.populationData === true && (
                <a
                  href={
                    "https://inquire-team" +
                    this.context.currentUser.teamID +
                    ".s3-us-west-1.amazonaws.com/" +
                    txt
                  }
                  download
                >
                  Data Download
                </a>
              )}
            </div>
          </div>
          <div class="column">
            <div class="card">
              Competitors Data: $2,000
              <button
                type="button"
                onClick={this.handleClick}
                class="btn btn-primary"
                value="2000"
                name="competitor"
              >
                Puchase
              </button>
              {this.state.competitorData === true && (
                <a
                  href={
                    "https://inquire-team" +
                    this.context.currentUser.teamID +
                    ".s3-us-west-1.amazonaws.com/" +
                    txt
                  }
                  download
                >
                  Data Download
                </a>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default buyDataForm;
