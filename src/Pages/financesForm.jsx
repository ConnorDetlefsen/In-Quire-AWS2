import React, { Component } from "react";
import http from "../Services/httpService";
import config from "../config.json";
import UserContext from "../Context/UserContext";
import SideBar from "../Components/sideBar";
import { Link } from "react-router-dom";

const pdf = "S3_test.pdf";
const txt = "S3_pull.txt";

class financesForm extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      finances: [],
      team: [],
      marketing: 0,
      inventory: 0,
      fixed: 0,
      legal: 0,
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
      .get(config.apiEndpoint + "/finances/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ finances: res.data });
        console.log(res);
        /*
        for (let x in res) {
          console.log(res.data[x].trans_id);
        }
        */
      });
    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ team: res.data });
        console.log(res);
      });
    this.setFinances(this.state.finances);

    http
      .get(
        config.apiEndpoint +
          "/filenames/" +
          this.context.currentUser.teamID +
          "/4"
      )
      .then((res) => {
        this.setState({ data: res.data });
        console.log(res);
      });
  }

  setFinances = (finances) => {
    for (let x in finances) {
      console.log(finances[x].trans_id);
    }
  };
  render() {
    const { finances, team } = this.state;
    return (
      <React.Fragment>
        <div class="d-flex" id="wrapper">
          <SideBar></SideBar>
          <div id="page-content-wrapper">
            <nav className="navbar navbar-dark bg-dark">
              <h1 class="whiteFont">Finances</h1>
            </nav>
            <nav className="navbar background">
              Budget: {team.budget} <br />
              <button class="btn btn-warning">
                <Link class="blackFont" to="/refreshFin">
                  Refresh Page
                </Link>
              </button>
            </nav>

            <table class="table">
              <thead class="thead-light">
                <tr>
                  <th scope="col">Category</th>
                  <th scope="col">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Inventory</td>
                  <td>{this.state.finances.total_inventory}</td>
                </tr>
                <tr>
                  <td>Marketing</td>
                  <td>{this.state.finances.total_marketing}</td>
                </tr>
                <tr>
                  <td>Data Purchases </td>
                  <td>{this.state.finances.total_data}</td>
                </tr>
                <tr>
                  <td>Fixed Costs</td>
                  <td>{this.state.finances.total_fixed}</td>
                </tr>
                <tr>
                  <td>Legal Costs</td>
                  <td>{this.state.finances.total_legal}</td>
                </tr>
              </tbody>
            </table>
            <br />
            <center>
              <button
                //disabled={true} //undisable this after round 2
                type="button"
                class="btn btn-warning"
                margin-top=".5em"
              >
                <a
                  class="blackFont"
                  href={
                    "https://inquire-team" +
                    this.context.currentUser.teamID +
                    ".s3-us-west-1.amazonaws.com/" +
                    this.state.data.finances +
                    ".csv"
                  }
                  download
                >
                  Download Finances
                </a>
              </button>
            </center>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default financesForm;
