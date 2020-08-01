import React, { Component } from "react";
import http from "../Services/httpService";
import config from "../config.json";
import UserContext from "../Context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../Components/Nav";

class messagingForm extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      new_message: "",
      errors: {},
      team: [],
    };
  }
  async componentDidMount() {
    http
      .get(config.apiEndpoint + "/message/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ messages: res.data });
        console.log(res);
      });
    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ team: res.data });
        console.log(res);
      });
  }
  handleSubmit = async (e) => {
    e.preventDefault();

    http
      .post(config.apiEndpoint + "/message/", {
        message: this.state.new_message,
        team_id: this.context.currentUser.teamID,
      })
      .then((res) => {
        console.log(res);
        toast.success(`Message Sent`);
      })
      .catch((err) => {
        toast.error(`Message could not be sent `);
      });
  };

  handleChange = (e) => {
    this.setState({ new_message: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar />
        <nav className="navbar navbar-light bg-primary">
          Budget: {this.state.team.budget}{" "}
        </nav>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div class="form-group">
              <p>Send a message to the team!</p>
              <textarea
                onChange={this.handleChange}
                className="form-control"
                rows="5"
              ></textarea>
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
export default messagingForm;
