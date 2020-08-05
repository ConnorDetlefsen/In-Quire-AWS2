import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import logo from "./In-Quire.png";

class sideBar extends Component {
  state = {
    round: true,
  };

  notRoundOne() {
    toast.error("You can access this next round! ");
  }
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <div class="border-right" id="sidebar-wrapper">
          <div class="sidebar-heading">
            <img src={logo} width="120px" height="55px"></img>
          </div>
          <div class="list-group list-group-flush">
            <Link class="list-group-item list-group-item-action" to="/overview">
              Overview
            </Link>
            <Link
              class="list-group-item list-group-item-action "
              to="/location"
            >
              Location
            </Link>
            <Link
              disabled={this.state.round}
              class="list-group-item list-group-item-action "
              //onClick={this.notRoundOne}
              to="/inventory"
            >
              Inventory
            </Link>
            <Link
              className="list-group-item list-group-item-action "
              //onClick={this.notRoundOne}
              to="/marketing"
            >
              Marketing
            </Link>
            <Link
              class="list-group-item list-group-item-action "
              //onClick={this.notRoundOne}
              to="/finances"
            >
              Finances
            </Link>
            <Link
              class="list-group-item list-group-item-action "
              //onClick={this.notRoundOne}
              to="/messages"
            >
              Memo
            </Link>
            <Link
              class="list-group-item list-group-item-action "
              //onClick={this.notRoundOne}
              to="/inbox"
            >
              Inbox
            </Link>
            <Link
              class="list-group-item list-group-item-action"
              //onClick={this.notRoundOne}
              to="/buydata"
            >
              Buy Data
            </Link>
            <br />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default sideBar;
