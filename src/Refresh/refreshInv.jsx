import React, { Component } from "react";

class refreshInv extends Component {
  state = {};

  componentDidMount() {
    const { history } = this.props;
    history.push("/inventory");
  }

  render() {
    return <button class="btn btn-warning">Refresh</button>;
  }
}

export default refreshInv;
