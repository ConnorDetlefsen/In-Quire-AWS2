import React, { Component } from "react";
import http from "../Services/httpService";
import config from "../config.json";
import UserContext from "../Context/UserContext";
import SideBar from "../Components/sideBar";

class financesForm extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      finances: [],
      team: [],
    };
  }
  async componentDidMount() {
    http
      .get(config.apiEndpoint + "/log/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ finances: res.data });
        console.log(res);
      });
    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ team: res.data });
        console.log(res);
      });
  }
  render() {
    const { finances, team } = this.state;
    return (
      <React.Fragment>
        <div class="d-flex" id="wrapper">
          <SideBar></SideBar>
          <div id="page-content-wrapper">
            <nav className="navbar navbar-dark bg-dark">
              <h1 class="whiteFont">Finances</h1>
            </nav>
            <nav className="navbar navbar-light bg-primary">
              Budget: {team.budget}{" "}
            </nav>
            <table class="table">
              <thead class="thead-light">
                <tr>
                  <th scope="col">Category</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Round</th>
                  <th scope="col">Date</th>
                  <th scope="col">Timestamp</th>
                </tr>
              </thead>

              <tbody>
                {finances.map((finances) => (
                  <tr key={finances.trans_id}>
                    <td>{finances.category}</td>
                    <td>${finances.amount}</td>

                    <td>{finances.round_num}</td>
                    <td>{("" + finances.stamp).substring(0, 10)}</td>
                    <td>{("" + finances.stamp).substring(11, 19)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default financesForm;
