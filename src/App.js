import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Route, Switch } from "react-router-dom";
import Login from "./Components/loginForm";
import Inventory from "./Pages/inventoryForm";
import Nav from "./Components/Nav";
import Marketing from "./Pages/MarketingForm";
import Messages from "./Pages/messagingForm";
import Finances from "./Pages/financesForm";
import Location from "./Pages/locationComponent";
import Overview from "./Pages/overviewComponent";
import BuyData from "./Pages/buyDataForm";
import { UserContext } from "./Context/UserContext";

class App extends Component {
  handleLoggedIn = (username) => {
    console.log("getting user: " + username);
    const user = { name: "Connor" };
    this.setState({ currentUser: user });
  };
  state = { currentUser: { name: null, teamID: null, budget: null } };
  render() {
    return (
      <React.Fragment>
        <UserContext.Provider
          value={{
            currentUser: this.state.currentUser,
            onLoggedIn: this.handleLoggedIn,
          }}
        >
          <Nav />
          <div className="mainContent">
            <Switch>
              <Route path="/overview" component={Overview} />
              <Route path="/buydata" component={BuyData} />
              <Route path="/inventory" component={Inventory} />
              <Route path="/marketing" component={Marketing} />
              <Route path="/messages" component={Messages} />
              <Route path="/finances" component={Finances} />
              <Route path="/location" component={Location} />

              <Route path="/" exact component={Login} />
            </Switch>
          </div>
        </UserContext.Provider>
      </React.Fragment>
    );
  }
}

export default App;
