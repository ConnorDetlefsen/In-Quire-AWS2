import React, { Component } from "react";

class refreshData extends Component {
  state = {};

  componentDidMount() {
    const { history } = this.props;
    history.push("/buydata");
  }

  render() {
    return <button class="btn btn-warning">Refresh</button>;
  }
}

export default refreshData;
