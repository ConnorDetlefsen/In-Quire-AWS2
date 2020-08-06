import React, { Component } from "react";

class refreshFinances extends Component {
  state = {};

  componentDidMount() {
    const { history } = this.props;
    history.push("/finances");
  }

  render() {
    return <button class="btn btn-warning">Refresh</button>;
  }
}

export default refreshFinances;
