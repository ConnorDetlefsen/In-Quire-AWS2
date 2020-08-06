import React, { Component } from "react";

class refreshMKTG extends Component {
  state = {};

  componentDidMount() {
    const { history } = this.props;
    history.push("/marketing");
  }

  render() {
    return <button class="btn btn-warning">Refresh</button>;
  }
}

export default refreshMKTG;
