import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserContext from "../Context/UserContext";

class Nav extends Component {
  static contextType = UserContext;

  componentDidMount() {
    console.log("context", this.context);
  }

  render() {
    return (
      <React.Fragment>
        <nav>
          <ul class="nav nav-tabs bg-light">
            <li class="nav-item">
              <Link class="nav-link active" to="/overview">
                Overview
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/location">
                Location
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/inventory">
                Inventory
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/marketing">
                Marketing
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/finances">
                Finances
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/messages">
                Messages
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/buydata">
                Buy Data
              </Link>
            </li>
          </ul>
        </nav>
      </React.Fragment>
    );
  }
}

export default Nav;
