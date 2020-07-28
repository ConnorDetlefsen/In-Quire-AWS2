import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import http from "../Services/httpService.js";
import "react-toastify/dist/ReactToastify.css";
import config from "../config.json";
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
    };
    /*this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this); */
  }

  async componentDidMount() {
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
    marketing[selectVal] = parseInt(amount, 10) + parseInt(plusThis, 10);
    //marketing[selectVal] = amount + add;
    const { data } = await http.put(
      config.apiEndpoint + "/marketing/" + this.context.currentUser.teamID,
      marketing
    );
    console.log(data);
  };
  budgetUpdate = async (team) => {
    const amount = this.state.amount;
    const budget = this.context.currentUser.budget; // used to set api team.budget

    team.budget = parseInt(budget, 10) - parseInt(amount, 10);
    this.context.currentUser.budget = team.budget; //updates the context

    const { data } = await http.put(
      config.apiEndpoint + "/team/" + this.context.currentUser.teamID,
      team
    );
    console.log(data);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate(); //error checking if negative or if no dropdown selected
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.putSubmit(this.state.marketing);
    this.budgetUpdate(this.state.team);
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
        <nav className="navbar navbar-light bg-primary">
          Budget: {team.budget}{" "}
        </nav>

        <form onSubmit={this.handleSubmit}>
          <label>
            Select Marketing Type
            <select
              id="dropdown"
              className="message-box"
              onChange={this.handleDropdownChange}
              value={this.state.selectValue}
            >
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="newspaper">Newspaper</option>
              <option value="television">Television</option>
            </select>
          </label>
          <div className="form-group">
            <label>Amount $ </label>
            <input
              value={this.state.amount}
              onChange={this.handleChange}
              name="amount"
              type="number"
              className="test"
              id="amount"
              error={errors.amount}
            />
          </div>

          <button type="submit" className="inv-btn" margin-top=".5em">
            Submit
          </button>
        </form>
        <div>
          <h1>Team ID: {this.context.currentUser.teamID}</h1>
          <h1>Facebook: {marketing.facebook}</h1>
          <h1>Instagram: {marketing.instagram}</h1>
          <h1>Television: {marketing.television}</h1>
          <h1>Newspaper: {marketing.newspaper}</h1>
        </div>
      </React.Fragment>
    );
  }
}

export default MarketingForm;
