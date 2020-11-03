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

      data7: false,
      data8: false,
      data9: false,

      data10: false,
      data11: false,
      data12: false,

      data13: false,
      data14: false,
      data15: false,

      data16: false,
      data17: false,
      data18: false,

      log: { category: "Data", amount: null, team_id: null, round_num: 5 },
      finances: [],
      data: [],

      constantDataBought: [],
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
      .get(config.apiEndpoint + "/samedata/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ constantDataBought: res.data });
      });
    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ team: res.data });
        console.log(res);
      });
    http
      .get(
        config.apiEndpoint +
          "/buydata/" +
          this.context.currentUser.teamID +
          "/" +
          this.context.currentUser.round
      )
      .then((res) => {
        this.setState({ dataBought: res.data });
        console.log(res);
      });
    http
      .get(
        config.apiEndpoint +
          "/finances/" +
          this.context.currentUser.teamID +
          "/" +
          this.context.currentUser.round
      )
      .then((res) => {
        this.setState({ finances: res.data });
      });

    http
      .get(
        config.apiEndpoint +
          "/filenames/" +
          this.context.currentUser.teamID +
          "/" +
          this.context.currentUser.round //round #
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
  dataUpdate1 = async (constantDataBought) => {
    constantDataBought.data1 = true;

    http.put(
      config.apiEndpoint + "/samedata/" + this.context.currentUser.teamID,
      constantDataBought
    );
  };
  dataUpdate2 = async (constantDataBought) => {
    constantDataBought.data2 = true;

    http.put(
      config.apiEndpoint + "/samedata/" + this.context.currentUser.teamID,
      constantDataBought
    );
  };

  dataUpdate3 = async (constantDataBought) => {
    constantDataBought.data3 = true;

    http.put(
      config.apiEndpoint + "/samedata/" + this.context.currentUser.teamID,
      constantDataBought
    );
  };
  dataUpdate4 = async (constantDataBought) => {
    constantDataBought.data4 = true;

    http.put(
      config.apiEndpoint + "/samedata/" + this.context.currentUser.teamID,
      constantDataBought
    );
  };
  dataUpdate5 = async (constantDataBought) => {
    constantDataBought.data5 = true;

    http.put(
      config.apiEndpoint + "/samedata/" + this.context.currentUser.teamID,
      constantDataBought
    );
  };
  dataUpdate6 = async (constantDataBought) => {
    constantDataBought.data6 = true;

    http.put(
      config.apiEndpoint + "/samedata/" + this.context.currentUser.teamID,
      constantDataBought
    );
  };
  dataUpdate7 = async (dataBought) => {
    dataBought.data7 = true;

    const { data } = await http.put(
      config.apiEndpoint +
        "/buydata/" +
        this.context.currentUser.teamID +
        "/" +
        this.context.currentUser.round,
      dataBought
    );
    console.log(data);
  };
  dataUpdate8 = async (dataBought) => {
    dataBought.data8 = true;

    const { data } = await http.put(
      config.apiEndpoint +
        "/buydata/" +
        this.context.currentUser.teamID +
        "/" +
        this.context.currentUser.round,
      dataBought
    );
    console.log(data);
  };
  dataUpdate9 = async (dataBought) => {
    dataBought.data9 = true;

    const { data } = await http.put(
      config.apiEndpoint +
        "/buydata/" +
        this.context.currentUser.teamID +
        "/" +
        this.context.currentUser.round,
      dataBought
    );
    console.log(data);
  };
  dataUpdate10 = async (dataBought) => {
    dataBought.data10 = true;

    const { data } = await http.put(
      config.apiEndpoint +
        "/buydata/" +
        this.context.currentUser.teamID +
        "/" +
        this.context.currentUser.round,
      dataBought
    );
    console.log(data);
  };
  dataUpdate11 = async (dataBought) => {
    dataBought.data11 = true;

    const { data } = await http.put(
      config.apiEndpoint +
        "/buydata/" +
        this.context.currentUser.teamID +
        "/" +
        this.context.currentUser.round,
      dataBought
    );
    console.log(data);
  };
  dataUpdate12 = async (dataBought) => {
    dataBought.data12 = true;

    const { data } = await http.put(
      config.apiEndpoint +
        "/buydata/" +
        this.context.currentUser.teamID +
        "/" +
        this.context.currentUser.round,
      dataBought
    );
    console.log(data);
  };
  dataUpdate13 = async (dataBought) => {
    dataBought.data13 = true;

    const { data } = await http.put(
      config.apiEndpoint +
        "/buydata/" +
        this.context.currentUser.teamID +
        "/" +
        this.context.currentUser.round,
      dataBought
    );
    console.log(data);
  };
  dataUpdate14 = async (dataBought) => {
    dataBought.data14 = true;

    const { data } = await http.put(
      config.apiEndpoint +
        "/buydata/" +
        this.context.currentUser.teamID +
        "/" +
        this.context.currentUser.round,
      dataBought
    );
    console.log(data);
  };
  dataUpdate15 = async (dataBought) => {
    dataBought.data15 = true;

    const { data } = await http.put(
      config.apiEndpoint +
        "/buydata/" +
        this.context.currentUser.teamID +
        "/" +
        this.context.currentUser.round,
      dataBought
    );
    console.log(data);
  };
  dataUpdate16 = async (dataBought) => {
    dataBought.data16 = true;

    const { data } = await http.put(
      config.apiEndpoint +
        "/buydata/" +
        this.context.currentUser.teamID +
        "/" +
        this.context.currentUser.round,
      dataBought
    );
    console.log(data);
  };
  dataUpdate17 = async (dataBought) => {
    dataBought.data17 = true;

    const { data } = await http.put(
      config.apiEndpoint +
        "/buydata/" +
        this.context.currentUser.teamID +
        "/" +
        this.context.currentUser.round,
      dataBought
    );
    console.log(data);
  };
  dataUpdate18 = async (dataBought) => {
    dataBought.data18 = true;

    const { data } = await http.put(
      config.apiEndpoint +
        "/buydata/" +
        this.context.currentUser.teamID +
        "/" +
        this.context.currentUser.round,
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
        round_num: this.context.currentUser.round,
        category: "Data",
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
      config.apiEndpoint +
        "/finances/" +
        this.context.currentUser.teamID +
        "/" +
        this.context.currentUser.round,
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
      this.dataUpdate1(this.state.constantDataBought);
    }
    if (e.target.name === "detailedPop") {
      this.setState({ detailedPop: true });
      this.dataUpdate2(this.state.constantDataBought);
    }
    if (e.target.name === "basicInc") {
      this.setState({ basicInc: true });
      this.dataUpdate3(this.state.constantDataBought);
    }
    if (e.target.name === "detailedInc") {
      this.setState({ detailedInc: true });
      this.dataUpdate4(this.state.constantDataBought);
    }
    if (e.target.name === "basicAge") {
      this.setState({ basicAge: true });
      this.dataUpdate5(this.state.constantDataBought);
    }
    if (e.target.name === "detailedAge") {
      this.setState({ detailedAge: true });
      this.dataUpdate6(this.state.constantDataBought);
    }
    if (e.target.name === "data7") {
      this.setState({ data7: true });
      this.dataUpdate7(this.state.dataBought);
    }
    if (e.target.name === "data8") {
      this.setState({ data8: true });
      this.dataUpdate8(this.state.dataBought);
    }
    if (e.target.name === "data9") {
      this.setState({ data9: true });
      this.dataUpdate9(this.state.dataBought);
    }
    if (e.target.name === "data10") {
      this.setState({ data10: true });
      this.dataUpdate10(this.state.dataBought);
    }
    if (e.target.name === "data11") {
      this.setState({ data11: true });
      this.dataUpdate11(this.state.dataBought);
    }
    if (e.target.name === "data12") {
      this.setState({ data12: true });
      this.dataUpdate12(this.state.dataBought);
    }
    if (e.target.name === "data13") {
      this.setState({ data13: true });
      this.dataUpdate13(this.state.dataBought);
    }
    if (e.target.name === "data14") {
      this.setState({ data14: true });
      this.dataUpdate14(this.state.dataBought);
    }
    if (e.target.name === "data15") {
      this.setState({ data15: true });
      this.dataUpdate15(this.state.dataBought);
    }
    if (e.target.name === "data16") {
      this.setState({ data16: true });
      this.dataUpdate16(this.state.dataBought);
    }
    if (e.target.name === "data17") {
      this.setState({ data17: true });
      this.dataUpdate17(this.state.dataBought);
    }
    if (e.target.name === "data18") {
      this.setState({ data18: true });
      this.dataUpdate18(this.state.dataBought);
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
                <div
                  class="cardData
                "
                >
                  <h5>Customer Age Survey: $7000</h5>
                  <p>
                    This survey contains information on the age of your
                    customers.
                  </p>
                  <button
                    disabled={
                      !this.context.currentUser.isManager ||
                      this.state.dataBought.data7
                    }
                    type="button"
                    onClick={this.handleClick}
                    class="btn btn-primary"
                    value="7000"
                    name="data7"
                  >
                    Purchase
                  </button>
                  {this.state.dataBought.data7 === true && (
                    <a
                      href={
                        "https://bas-buydata-files.s3-us-west-1.amazonaws.com/" +
                        this.state.data.filename7 +
                        ".csv"
                      }
                      download
                    >
                      Data Download
                    </a>
                  )}
                </div>
                <div
                  class="cardData
                "
                >
                  <h5>Customer Gender Survey: $7000</h5>
                  <p>
                    This survey contains information on the gender of your
                    customers.
                  </p>
                  <button
                    disabled={
                      !this.context.currentUser.isManager ||
                      this.state.dataBought.data8
                    }
                    type="button"
                    onClick={this.handleClick}
                    class="btn btn-primary"
                    value="7000"
                    name="data8"
                  >
                    Purchase
                  </button>
                  {this.state.dataBought.data8 === true && (
                    <a
                      href={
                        "https://bas-buydata-files.s3-us-west-1.amazonaws.com/" +
                        this.state.data.filename8 +
                        ".csv"
                      }
                      download
                    >
                      Data Download
                    </a>
                  )}
                </div>
                <div
                  class="cardData
                "
                >
                  <h5>Basic Population Survey: $3000</h5>
                  <p>
                    This survey is a rough estimate of the population, or number
                    of potential customers, in the area.
                  </p>
                  <button
                    disabled={
                      !this.context.currentUser.isManager ||
                      this.state.constantDataBought.data1
                    }
                    type="button"
                    onClick={this.handleClick}
                    class="btn btn-primary"
                    value="3000"
                    name="basicPop"
                  >
                    Purchase
                  </button>
                  {this.state.constantDataBought.data1 === true && (
                    <a
                      href={
                        "https://bas-buydata-files.s3-us-west-1.amazonaws.com/" +
                        this.state.data.filename1 +
                        ".jpg"
                      }
                      download
                    >
                      Data Download
                    </a>
                  )}
                </div>
                <div class="cardData">
                  <h5>Detailed Population Survey: $7000</h5>
                  <p>
                    This survey is a more specific estimate of the population,
                    or number of potential customers, in the area.
                  </p>

                  <button
                    disabled={
                      !this.context.currentUser.isManager ||
                      this.state.constantDataBought.data2
                    }
                    type="button"
                    onClick={this.handleClick}
                    class="btn btn-primary"
                    value="7000"
                    name="detailedPop"
                  >
                    Purchase
                  </button>
                  {this.state.constantDataBought.data2 === true && (
                    <a
                      href={
                        "https://bas-buydata-files.s3-us-west-1.amazonaws.com/" +
                        this.state.data.filename2 +
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
                <div
                  class="cardData
                "
                >
                  <h5>Customer Income Survey: $7000</h5>
                  <p>
                    This survey contains information on the income of your
                    customers.
                  </p>
                  <button
                    disabled={
                      !this.context.currentUser.isManager ||
                      this.state.dataBought.data9
                    }
                    type="button"
                    onClick={this.handleClick}
                    class="btn btn-primary"
                    value="7000"
                    name="data9"
                  >
                    Purchase
                  </button>
                  {this.state.dataBought.data9 === true && (
                    <a
                      href={
                        "https://bas-buydata-files.s3-us-west-1.amazonaws.com/" +
                        this.state.data.filename9 +
                        ".csv"
                      }
                      download
                    >
                      Data Download
                    </a>
                  )}
                </div>
                <div class="cardData">
                  <h5>Basic Income Survey: $3000</h5>
                  <p>
                    This survey is a rough estimate of the average income of the
                    population in the area.
                  </p>
                  <button
                    disabled={
                      !this.context.currentUser.isManager ||
                      this.state.constantDataBought.data3
                    }
                    type="button"
                    onClick={this.handleClick}
                    class="btn btn-primary"
                    value="3000"
                    name="basicInc"
                  >
                    Purchase
                  </button>
                  {this.state.constantDataBought.data3 === true && (
                    <a
                      href={
                        "https://bas-buydata-files.s3-us-west-1.amazonaws.com/" +
                        this.state.data.filename3 +
                        ".jpg"
                      }
                      download
                    >
                      Data Download
                    </a>
                  )}
                </div>
                <div class="cardData">
                  <h5>Detailed Income Survey: $7000</h5>
                  <p>
                    This survey is a more specific estimate of the average
                    income of the population in the area.
                  </p>

                  <button
                    disabled={
                      !this.context.currentUser.isManager ||
                      this.state.constantDataBought.data4
                    }
                    type="button"
                    onClick={this.handleClick}
                    class="btn btn-primary"
                    value="7000"
                    name="detailedInc"
                  >
                    Purchase
                  </button>
                  {this.state.constantDataBought.data4 === true && (
                    <a
                      href={
                        "https://bas-buydata-files.s3-us-west-1.amazonaws.com/" +
                        this.state.data.filename4 +
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
                <div
                  class="cardData
                "
                >
                  <h5>Customer Location Survey: $7000</h5>
                  <p>
                    This survey contains information on the location of your
                    customers.
                  </p>
                  <button
                    disabled={
                      !this.context.currentUser.isManager ||
                      this.state.dataBought.data10
                    }
                    type="button"
                    onClick={this.handleClick}
                    class="btn btn-primary"
                    value="7000"
                    name="data10"
                  >
                    Purchase
                  </button>
                  {this.state.dataBought.data10 === true && (
                    <a
                      href={
                        "https://bas-buydata-files.s3-us-west-1.amazonaws.com/" +
                        this.state.data.filename10 +
                        ".csv"
                      }
                      download
                    >
                      Data Download
                    </a>
                  )}
                </div>
                <div class="cardData">
                  <h5>Basic Age Survey: $3,000</h5>
                  <p>
                    This survey is a rough estimate of the average age of the
                    population in the area.
                  </p>

                  <button
                    disabled={
                      !this.context.currentUser.isManager ||
                      this.state.constantDataBought.data5
                    }
                    type="button"
                    onClick={this.handleClick}
                    class="btn btn-primary"
                    value="3000"
                    name="basicAge"
                  >
                    Purchase
                  </button>
                  {this.state.constantDataBought.data5 === true && (
                    <a
                      href={
                        "https://bas-buydata-files.s3-us-west-1.amazonaws.com/" +
                        this.state.data.filename5 +
                        ".jpg"
                      }
                      download
                    >
                      Data Download
                    </a>
                  )}
                </div>
                <div class="cardData">
                  <h5>Detailed Age Survey: $7000</h5>
                  <p>
                    This survey is a more specific estimate of the average age
                    of the population in the area.
                  </p>

                  <button
                    disabled={
                      !this.context.currentUser.isManager ||
                      this.state.constantDataBought.data6
                    }
                    type="button"
                    onClick={this.handleClick}
                    class="btn btn-primary"
                    value="7000"
                    name="detailedAge"
                  >
                    Purchase
                  </button>
                  {this.state.constantDataBought.data6 === true && (
                    <a
                      href={
                        "https://bas-buydata-files.s3-us-west-1.amazonaws.com/" +
                        this.state.data.filename6 +
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
