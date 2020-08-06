import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import http from "../Services/httpService.js";
import "react-toastify/dist/ReactToastify.css";
import config from "../config.json";
import SideBar from "../Components/sideBar";
import { Link } from "react-router-dom";
import facebookIMG from "../Marketing-Images/Facebook.png";
import instagramIMG from "../Marketing-Images/instagram.png";
import TVIMG from "../Marketing-Images/TV.png";
import newspaperIMG from "../Marketing-Images/Newspaper.png";
import UserContext from "../Context/UserContext";

class MarketingForm extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      marketing: [],
      amount: 0,
      selectValue: "facebook",
      errors: {},
      team: [],
      log: { category: "Marketing", amount: null, team_id: null, round_num: 1 },
      finances: [],
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.putSubmit = this.putSubmit.bind(this);
    /*this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this); */
  }

  async componentDidMount() {
    const { history } = this.props;

    if (this.context.currentUser.name === null) {
      history.push("/");
    }
    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ team: res.data });
        console.log(res);
      });
    http
      .get(config.apiEndpoint + "/marketing/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ marketing: res.data });
        console.log(res);
      });
    http
      .get(config.apiEndpoint + "/finances/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ finances: res.data });
        console.log(res);
      });
  }

  validate = () => {
    const errors = {};

    const { amount, selectValue } = this.state;
    if (amount < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (selectValue === "select") {
      errors.selectValue = "Please enter a marketing type!";
      toast.error(`${errors.selectValue}`);
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleUpdate = async (marketing) => {
    marketing.facebook = 1000;
    const { data } = await http.put(
      config.apiEndpoint + "/marketing/" + this.context.currentUser.teamID,
      marketing
    );

    console.log(data);
  };

  putSubmit = async (marketing) => {
    const selectVal = this.state.selectValue;
    const amount = this.state.amount;
    const plusThis = this.state.marketing[selectVal];
    const test = parseInt(amount, 10) + parseInt(plusThis, 10);
    marketing[selectVal] = parseInt(amount, 10) + parseInt(plusThis, 10);
    //marketing[selectVal] = amount + add;
    const prevFinance = this.state.finances.total_marketing;
    const putFinance = parseInt(amount, 10) + parseInt(prevFinance, 10);
    this.state.finances.total_marketing = putFinance;
    const { data1 } = await http.put(
      config.apiEndpoint + "/finances/" + this.context.currentUser.teamID,
      this.state.finances
    );
    console.log(data1);

    const { data } = await http.put(
      config.apiEndpoint + "/marketing/" + this.context.currentUser.teamID,
      marketing
    );
    console.log(data);
    toast.success(
      "Marketing Order Submitted: " +
        this.state.selectValue +
        ": $" +
        this.state.amount
    );
    this.setState({ amount: 0 });
  };
  budgetUpdate = async (team) => {
    const amount = this.state.amount;
    const budget = team.budget; // used to set api team.budget

    const isBudgetNotNegative = parseInt(budget, 10) - parseInt(amount, 10);
    console.log(isBudgetNotNegative);
    if (isBudgetNotNegative < 0) {
      toast.error("You don't have enough money!");
      return;
    }
    team.budget = parseInt(budget, 10) - parseInt(amount, 10);

    this.context.currentUser.budget = team.budget; //updates the context

    const { data } = await http.put(
      config.apiEndpoint + "/team/" + this.context.currentUser.teamID,
      team
    );
    console.log(data);
    this.putSubmit(this.state.marketing);
  };

  handleSubmit = (e) => {
    const { amount, log } = this.state;

    e.preventDefault();

    const errors = this.validate(); //error checking if negative or if no dropdown selected
    this.setState({ errors: errors || {} });
    if (errors) return;

    if (amount % 1 === 0) {
      console.log("whole number");
    } else {
      toast.error("Please enter a whole number");
      return;
    }

    this.budgetUpdate(this.state.team);

    http
      .post(config.apiEndpoint + "/log/", {
        amount: amount,
        team_id: this.context.currentUser.teamID,
        round_num: log.round_num,
        category: log.category,
      })
      .then((res) => {
        console.log(res);
      });
    /*toast.success(
      "Marketing Order Submitted: " +
        this.state.selectValue +
        ": $" +
        this.state.amount
    );
    //this.setState({ amount: 0 }); */
  };

  handleChange = (e) => {
    this.setState({ amount: e.target.value });
  };
  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value });
  }

  render() {
    const { marketing, errors, team } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <div class="d-flex" id="wrapper">
          <SideBar></SideBar>
          <div id="page-content-wrapper">
            <nav className="navbar navbar-dark bg-dark">
              <h1 class="whiteFont">Marketing</h1>
            </nav>
            <nav className="navbar background">
              Budget: {team.budget} <br />{" "}
              <button class="btn btn-warning">
                <Link class="blackFont" to="/refreshMKTG">
                  Refresh Page
                </Link>
              </button>{" "}
            </nav>

            <br />
            <form onSubmit={this.handleSubmit}>
              <div>
                <center>
                  <div>
                    <label>
                      Select Marketing Type
                      <select
                        id="dropdown"
                        class=" form-control form-control-sm "
                        onChange={this.handleDropdownChange}
                        value={this.state.selectValue}
                      >
                        <option value="facebook">Facebook</option>
                        <option value="instagram">Instagram</option>
                        <option value="newspaper">Newspaper</option>
                        <option value="television">Television</option>
                      </select>
                    </label>
                    &emsp;&emsp;
                    <label>Amount $: &emsp; </label>
                    <input
                      value={this.state.amount}
                      onChange={this.handleChange}
                      name="amount"
                      type="number"
                      class="col-xs-4 form-control-sm "
                      id="amount"
                      error={errors.amount}
                    />
                  </div>

                  <div class="divider" />
                  <button
                    disabled={!this.context.currentUser.isManager}
                    type="submit"
                    margin-top=".5em"
                    class="btn btn-primary"
                  >
                    Submit
                  </button>
                </center>
              </div>
            </form>
            <br />
            <div class="row">
              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
              <div class="col-sm-5">
                <div class="card">
                  <h4>
                    {" "}
                    <img src={facebookIMG} height="60" width="60" />
                    Facebook Marketing
                  </h4>
                  <p>Description of what is included in this data package</p>
                  <h5>Amount Spent: {marketing.facebook}</h5>
                </div>
              </div>
              <br />
              &emsp;&emsp;&emsp;&emsp;
              <div class="col-sm-5">
                <div class="card">
                  <h4>
                    {" "}
                    <img src={instagramIMG} height="50" width="50" />
                    Instagram Marketing
                  </h4>
                  <p>Description of what is included in this data package</p>
                  <h5>Amount Spent: {marketing.instagram}</h5>
                </div>
              </div>
              <br />
              <br />
              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
              <div class="col-sm-5">
                <div class="card">
                  <h4>
                    {" "}
                    <img src={newspaperIMG} height="60" width="60" />
                    Newspaper Marketing
                  </h4>
                  <p>Description of what is included in this data package</p>
                  <h5>Amount Spent: {marketing.newspaper}</h5>
                </div>
              </div>
              <br />
              &emsp;&emsp;&emsp;&emsp;
              <div class="col-sm-5">
                <div class="card">
                  <h4>
                    {" "}
                    <img src={TVIMG} height="60" width="60" />
                    Television Marketing
                  </h4>
                  <p>Description of what is included in this data package</p>
                  <h5>Amount Spent: {marketing.television}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MarketingForm;
