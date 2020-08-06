import React, { Component } from "react";

class refreshMsg extends Component {
  state = {};

  componentDidMount() {
    const { history } = this.props;
    history.push("/messages");
  }

  render() {
    return <button class="btn btn-warning">Refresh</button>;
  }
}

export default refreshMsg;
