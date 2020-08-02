import React, { Component } from "react";
import { Link } from "react-router-dom";

class sideBar extends Component {
  state = {};
  render() {
    return (
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
            class="list-group-item list-group-item-action bg-light"
            to="/inventory"
          >
            Inventory
          </Link>
          <Link
            class="list-group-item list-group-item-action bg-light"
            to="/marketing"
          >
            Marketing
          </Link>
          <Link
            class="list-group-item list-group-item-action bg-light"
            to="/finances"
          >
            Finances
          </Link>
          <Link
            class="list-group-item list-group-item-action bg-light"
            to="/messages"
          >
            Messages
          </Link>
          <Link
            class="list-group-item list-group-item-action bg-light"
            to="/buydata"
          >
            Buy Data
          </Link>
        </div>
      </div>
    );
  }
}

export default sideBar;
