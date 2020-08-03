import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

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
        <div class="bg-light border-right" id="sidebar-wrapper">
          <div class="sidebar-heading">In-Quire</div>
          <div class="list-group list-group-flush">
            <Link
              class="list-group-item list-group-item-action bg-light"
              to="/overview"
            >
              Overview
            </Link>
            <Link
              class="list-group-item list-group-item-action bg-light"
              to="/location"
            >
              Location
            </Link>
            <Link
              disabled={this.state.round}
              class="list-group-item list-group-item-action bg-light"
              //onClick={this.notRoundOne}
              to="/inventory"
            >
              Inventory
            </Link>
            <Link
              class="list-group-item list-group-item-action bg-light"
              //onClick={this.notRoundOne}
              to="/marketing"
            >
              Marketing
            </Link>
            <Link
              class="list-group-item list-group-item-action bg-light"
              //onClick={this.notRoundOne}
              to="/finances"
            >
              Finances
            </Link>
            <Link
              class="list-group-item list-group-item-action bg-light"
              //onClick={this.notRoundOne}
              to="/messages"
            >
              Memo
            </Link>
            <Link
              class="list-group-item list-group-item-action bg-light"
              //onClick={this.notRoundOne}
              to="/buydata"
            >
              Buy Data
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default sideBar;
