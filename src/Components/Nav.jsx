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
      <nav className="navbar navbar-light bg-light">
        <ul>
          <li>In-Quire</li>
          <li>
            <Link to="/overview">Overview</Link>
          </li>

          <li>
            <Link to="/location">Location</Link>
          </li>
          <li>
            <Link to="/inventory">Inventory</Link>
          </li>
          <li>
            <Link to="/marketing">Marketing</Link>
          </li>
          <li>
            <Link to="/finances">Finances</Link>
          </li>
          <li>
            <Link to="/messages">Messages</Link>
          </li>
          <li>
            <Link to="/buydata">Buy Data</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
