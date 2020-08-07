import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import logo from "./In-Quire.png";
import "font-awesome/css/font-awesome.min.css";

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
              <i className="fa fa-home" aria-hidden="false">
                &ensp;Overview
              </i>
            </Link>
            <Link
              class="list-group-item list-group-item-action "
              to="/location"
            >
              <i class="fa fa-map-marker" aria-hidden="true">
                &ensp;Location
              </i>
            </Link>
            <Link
              disabled={this.state.round}
              class="list-group-item list-group-item-action "
              //onClick={this.notRoundOne}
              to="/inventory"
            >
              <i class="fa fa-coffee" aria-hidden="true">
                &ensp;Inventory
              </i>
            </Link>
            <Link
              className="list-group-item list-group-item-action "
              //onClick={this.notRoundOne}
              to="/marketing"
            >
              <i class="fa fa-newspaper-o" aria-hidden="true">
                &ensp;Marketing
              </i>
            </Link>
            <Link
              class="list-group-item list-group-item-action "
              //onClick={this.notRoundOne}
              to="/finances"
            >
              <i class="fa fa-credit-card" aria-hidden="true">
                &ensp;Finances
              </i>
            </Link>
            <Link
              class="list-group-item list-group-item-action "
              //onClick={this.notRoundOne}
              to="/messages"
            >
              <i class="fa fa-envelope-o" aria-hidden="true">
                &ensp;Memo
              </i>
            </Link>
            <Link
              class="list-group-item list-group-item-action "
              //onClick={this.notRoundOne}
              to="/inbox"
            >
              <i class="fa fa-inbox" aria-hidden="true">
                &ensp;Inbox
              </i>
            </Link>
            <Link
              class="list-group-item list-group-item-action"
              //onClick={this.notRoundOne}
              to="/buydata"
            >
              <i class="fa fa-database" aria-hidden="true">
                {" "}
                &ensp;Buy Data
              </i>
            </Link>
            <a
              class="list-group-item list-group-item-action"
              //onClick={this.notRoundOne}
              href="https://docs.google.com/document/u/1/d/1AW1_sqPzfWL9sLH0pceFsyZf1SaESFUNDRwnD5G_hpg/edit?usp=sharing"
            >
              <i class="fa fa-question" aria-hidden="true">
                {" "}
                &ensp;FAQ
              </i>
            </a>

            <br />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default sideBar;
