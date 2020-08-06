import React, { Component } from "react";

class refreshInbox extends Component {
  state = {};

  componentDidMount() {
    const { history } = this.props;
    history.push("/inbox");
  }

  render() {
    return <button class="btn btn-warning">Refresh</button>;
  }
}

export default refreshInbox;
