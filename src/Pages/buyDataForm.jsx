import React, { Component } from "react";
import UserContext from "../Context/UserContext";
import http from "../Services/httpService";
import config from "../config.json";
import SideBar from "../Components/sideBar";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const pdf = "S3_test.pdf";
const txt = "S3_pull.txt";
const csv = "msft.csv";

class buyDataForm extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      team: [],
      cost: 0,
      dataBought: [],
      marketingData: false,
      populationData: false,
      competitorData: false,
      log: { category: "Data", amount: null, team_id: null, round_num: 1 },
      finances: [],
      data: [],
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
    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ team: res.data });
        console.log(res);
      });
    http
      .get(config.apiEndpoint + "/buydata/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ dataBought: res.data });
        console.log(res);
      });
    http
      .get(config.apiEndpoint + "/finances/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ finances: res.data });
        console.log(res);
      });
    http
      .get(
        config.apiEndpoint +
          "/filenames/" +
          this.context.currentUser.teamID +
          "/1" //round #
      )
      .then((res) => {
        this.setState({ data: res.data });
        console.log(res);
      });

    //this.setState({ marketingData: this.state.dataBought.data1 });
    //console.log(this.state.marketingData);
  }

  /*dataUpdate = async (dataBought) => {
    const { marketingData, populationData, competitorData } = this.state;

    dataBought.data1 = marketingData;
    dataBought.data2 = populationData;
    dataBought.data3 = competitorData;

    const { data } = await http.put(
      config.apiEndpoint + "/buydata/" + this.context.currentUser.teamID,
      dataBought
    );
    console.log(data);
  };
*/
  dataUpdate1 = async (dataBought) => {
    dataBought.data1 = true;

    const { data } = await http.put(
      config.apiEndpoint + "/buydata/" + this.context.currentUser.teamID,
      dataBought
    );
    console.log(data);
  };
  dataUpdate2 = async (dataBought) => {
    dataBought.data2 = true;

    const { data } = await http.put(
      config.apiEndpoint + "/buydata/" + this.context.currentUser.teamID,
      dataBought
    );
    console.log(data);
  };

  dataUpdate3 = async (dataBought) => {
    dataBought.data3 = true;

    const { data } = await http.put(
      config.apiEndpoint + "/buydata/" + this.context.currentUser.teamID,
      dataBought
    );
    console.log(data);
  };

  budgetUpdate = async (team) => {
    const cost1 = this.state.cost;
    const budget = team.budget; // used to set api team.budget

    const { log } = this.state;
    http
      .post(config.apiEndpoint + "/log/", {
        amount: cost1,
        team_id: this.context.currentUser.teamID,
        round_num: log.round_num,
        category: log.category,
      })
      .then((res) => {
        console.log(res);
      });

    team.budget = parseInt(budget, 10) - parseInt(cost1, 10);

    this.context.currentUser.budget = team.budget; //updates the context

    const { data } = await http.put(
      config.apiEndpoint + "/team/" + this.context.currentUser.teamID,
      team
    );
    console.log(data);

    const prevFinance = this.state.finances.total_data;
    const putFinance = parseInt(cost1, 10) + parseInt(prevFinance, 10);
    this.state.finances.total_data = putFinance;
    const { data1 } = await http.put(
      config.apiEndpoint + "/finances/" + this.context.currentUser.teamID,
      this.state.finances
    );
    console.log(data1);
  };

  handleClick = (e) => {
    this.state.cost = e.target.value;
    console.log(this.state.cost);

    const cost1 = this.state.cost;
    const budget = this.state.team.budget; // used to set api team.budget

    const isBudgetNotNegative = parseInt(budget, 10) - parseInt(cost1, 10);
    if (isBudgetNotNegative < 0) {
      toast.error("You don't have enough money!");
      return;
    }
    this.budgetUpdate(this.state.team);

    if (e.target.name === "marketing") {
      //this.setState({ marketingData: this.state.dataBought.data1 });
      this.setState({ marketingData: true });
      this.dataUpdate1(this.state.dataBought);
    }
    if (e.target.name === "population") {
      this.setState({ populationData: true });
      this.dataUpdate2(this.state.dataBought);
    }
    if (e.target.name === "competitor") {
      this.setState({ competitorData: true });
      this.dataUpdate3(this.state.dataBought);
    }
    toast.success("Data Purchased!");
  };

  render() {
    const { team } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <div class="d-flex" id="wrapper">
          <SideBar></SideBar>
          <div id="page-content-wrapper">
            <nav className="navbar navbar-dark bg-dark">
              <h1 class="whiteFont">Buy Data</h1>
            </nav>
            <nav className="navbar background">
              Budget: {team.budget} <br />{" "}
              <button class="btn btn-warning">
                <Link class="blackFont" to="/refreshData">
                  Refresh Page
                </Link>
              </button>{" "}
            </nav>

            <br />
            <div class="row">
              <div class="column">
                <div class="card">
                  <h5>Marketing Data: $1,000</h5>
                  <p>Description of what is included in this data package</p>
                  <button
                    disabled={
                      !this.context.currentUser.isManager ||
                      this.state.dataBought.data1
                    }
                    type="button"
                    onClick={this.handleClick}
                    class="btn btn-primary"
                    value="1000"
                    name="marketing"
                  >
                    Purchase
                  </button>
                  {this.state.dataBought.data1 === true && (
                    <a
                      href={
                        "https://inquire-team" +
                        this.context.currentUser.teamID +
                        ".s3-us-west-1.amazonaws.com/" +
                        this.state.data.data1 +
                        ".csv"
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
                  <h5>Population Data: $1,500</h5>
                  <p>Description of what is included in this data package</p>
                  <button
                    disabled={
                      !this.context.currentUser.isManager ||
                      this.state.dataBought.data2
                    }
                    type="button"
                    onClick={this.handleClick}
                    class="btn btn-primary"
                    value="1500"
                    name="population"
                  >
                    Purchase
                  </button>
                  {this.state.dataBought.data2 === true && (
                    <a
                      href={
                        "https://inquire-team" +
                        this.context.currentUser.teamID +
                        ".s3-us-west-1.amazonaws.com/" +
                        this.state.data.data2 +
                        ".csv"
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
                  <h5>Competitors Data: $2,000</h5>
                  <p>Description of what is included in this data package</p>

                  <button
                    disabled={
                      !this.context.currentUser.isManager ||
                      this.state.dataBought.data3
                    }
                    type="button"
                    onClick={this.handleClick}
                    class="btn btn-primary"
                    value="2000"
                    name="competitor"
                  >
                    Purchase
                  </button>
                  {this.state.dataBought.data3 === true && (
                    <a
                      href={
                        "https://inquire-team" +
                        this.context.currentUser.teamID +
                        ".s3-us-west-1.amazonaws.com/" +
                        this.state.data.data3 +
                        ".csv"
                      }
                      download
                    >
                      Data Download
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default buyDataForm;
