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

      basicPop: false,
      detailedPop: false,
      basicInc: false,
      detailedInc: false,
      basicAge: false,
      detailedAge: false,

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
  dataUpdate4 = async (dataBought) => {
    dataBought.data4 = true;

    const { data } = await http.put(
      config.apiEndpoint + "/buydata/" + this.context.currentUser.teamID,
      dataBought
    );
    console.log(data);
  };
  dataUpdate5 = async (dataBought) => {
    dataBought.data5 = true;

    const { data } = await http.put(
      config.apiEndpoint + "/buydata/" + this.context.currentUser.teamID,
      dataBought
    );
    console.log(data);
  };
  dataUpdate6 = async (dataBought) => {
    dataBought.data6 = true;

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

    if (e.target.name === "basicPop") {
      //this.setState({ marketingData: this.state.dataBought.data1 });
      this.setState({ basicPop: true });
      this.dataUpdate1(this.state.dataBought);
    }
    if (e.target.name === "detailedPop") {
      this.setState({ detailedPop: true });
      this.dataUpdate2(this.state.dataBought);
    }
    if (e.target.name === "basicInc") {
      this.setState({ basicInc: true });
      this.dataUpdate3(this.state.dataBought);
    }
    if (e.target.name === "detailedInc") {
      this.setState({ detailedInc: true });
      this.dataUpdate4(this.state.dataBought);
    }
    if (e.target.name === "basicAge") {
      this.setState({ basicAge: true });
      this.dataUpdate5(this.state.dataBought);
    }
    if (e.target.name === "detailedAge") {
      this.setState({ detailedAge: true });
      this.dataUpdate6(this.state.dataBought);
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
                  <h5>Basic Population Survey: $3000</h5>
                  <p>
                    This survey is a rough estimate of the population, or number
                    of potential customers, in the area.
                  </p>
                  <button
                    disabled={
                      !this.context.currentUser.isManager ||
                      this.state.dataBought.data1
                    }
                    type="button"
                    onClick={this.handleClick}
                    class="btn btn-primary"
                    value="3000"
                    name="basicPop"
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
                        ".jpg"
                      }
                      download
                    >
                      Data Download
                    </a>
                  )}
                </div>
                <div class="card">
                  <h5>Detailed Population Survey: $7000</h5>
                  <p>
                    This survey is a more specific estimate of the population,
                    or number of potential customers, in the area.
                  </p>

                  <button
                    disabled={
                      !this.context.currentUser.isManager ||
                      this.state.dataBought.data2
                    }
                    type="button"
                    onClick={this.handleClick}
                    class="btn btn-primary"
                    value="7000"
                    name="detailedPop"
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
                        ".jpg"
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
                  <h5>Basic Income Survey: $3000</h5>
                  <p>
                    This survey is a rough estimate of the average income of the
                    population in the area.
                  </p>
                  <button
                    disabled={
                      !this.context.currentUser.isManager ||
                      this.state.dataBought.data3
                    }
                    type="button"
                    onClick={this.handleClick}
                    class="btn btn-primary"
                    value="3000"
                    name="basicInc"
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
                        ".jpg"
                      }
                      download
                    >
                      Data Download
                    </a>
                  )}
                </div>
                <div class="card">
                  <h5>Detailed Income Survey: $7000</h5>
                  <p>
                    This survey is a more specific estimate of the average
                    income of the population in the area.
                  </p>

                  <button
                    disabled={
                      !this.context.currentUser.isManager ||
                      this.state.dataBought.data4
                    }
                    type="button"
                    onClick={this.handleClick}
                    class="btn btn-primary"
                    value="7000"
                    name="detailedInc"
                  >
                    Purchase
                  </button>
                  {this.state.dataBought.data4 === true && (
                    <a
                      href={
                        "https://inquire-team" +
                        this.context.currentUser.teamID +
                        ".s3-us-west-1.amazonaws.com/" +
                        this.state.data.data4 +
                        ".jpg"
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
                  <h5>Basic Age Survey: $3,000</h5>
                  <p>
                    This survey is a rough estimate of the average age of the
                    population in the area.
                  </p>

                  <button
                    disabled={
                      !this.context.currentUser.isManager ||
                      this.state.dataBought.data5
                    }
                    type="button"
                    onClick={this.handleClick}
                    class="btn btn-primary"
                    value="3000"
                    name="basicAge"
                  >
                    Purchase
                  </button>
                  {this.state.dataBought.data5 === true && (
                    <a
                      href={
                        "https://inquire-team" +
                        this.context.currentUser.teamID +
                        ".s3-us-west-1.amazonaws.com/" +
                        this.state.data.data5 +
                        ".jpg"
                      }
                      download
                    >
                      Data Download
                    </a>
                  )}
                </div>
                <div class="card">
                  <h5>Detailed Age Survey: $7000</h5>
                  <p>
                    This survey is a more specific estimate of the average age
                    of the population in the area.
                  </p>

                  <button
                    disabled={
                      !this.context.currentUser.isManager ||
                      this.state.dataBought.data6
                    }
                    type="button"
                    onClick={this.handleClick}
                    class="btn btn-primary"
                    value="7000"
                    name="detailedAge"
                  >
                    Purchase
                  </button>
                  {this.state.dataBought.data6 === true && (
                    <a
                      href={
                        "https://inquire-team" +
                        this.context.currentUser.teamID +
                        ".s3-us-west-1.amazonaws.com/" +
                        this.state.data.data6 +
                        ".jpg"
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
