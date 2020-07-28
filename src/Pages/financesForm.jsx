import React, { Component } from "react";
import http from "../Services/httpService";
import config from "../config.json";
import UserContext from "../Context/UserContext";
class financesForm extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      finances: [],
    };
  }
  async componentDidMount() {
    http
      .get(config.apiEndpoint + "/log/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ finances: res.data });
        console.log(res);
      });
  }
  render() {
    const { finances } = this.state;
    return (
      <div>
        <table className="financeTable">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {finances.map((finances) => (
              <tr key={finances.trans_id}>
                <td>{finances.category}</td>
                <td>${finances.amount}</td>
                <td>{("" + finances.stamp).substring(0, 10)}</td>
                <td>{("" + finances.stamp).substring(11, 19)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default financesForm;
