import React, { Component } from "react";

class refreshLoc extends Component {
  state = {};

  componentDidMount() {
    const { history } = this.props;
    history.push("/location");
  }

  render() {
    return <button class="btn btn-warning">Refresh</button>;
  }
}

export default refreshLoc;
