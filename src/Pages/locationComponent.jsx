import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import Joi from "joi-browser";
import SideBar from "../Components/sideBar";
import UserContext from "../Context/UserContext";
import config from "../config.json";
import http from "../Services/httpService.js";
import { ToastContainer, toast } from "react-toastify";
import store1 from "../Store-Images/1.jpg";
import store2 from "../Store-Images/2.jpg";
import store3 from "../Store-Images/3.jpg";

const mapStyles = {
  width: "85%",
  height: "100%",
  color: "black",
};

class locationComponent extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false, //Hides or the shows the infoWindow
      activeMarker: {}, //Shows the active marker upon click
      selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
      selectValue: "1",
      amount: 0,
      errors: {},
      team: [],
      locations: [],

      locID: 0, //for clear bid
      locClear: [],
      refund: 0,

      test: "this is state test",

      prevID: 1,
      location: [],
      prevTeam: [],
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  async componentDidMount() {
    const { history } = this.props;

    if (this.context.currentUser.name === null) {
      history.push("/");
    }
    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ team: res.data });
        this.context.currentUser.isHighestBid = res.data.ishighestbid;
        console.log(this.context.currentUser.isHighestBid);
        console.log(res);
      });
    http.get(config.apiEndpoint + "/location/").then((res) => {
      this.setState({ locations: res.data });
      console.log(res);
    });
  }
  validate = () => {
    const errors = {};

    const { amount, selectValue } = this.state;
    if (amount < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (selectValue === "select") {
      errors.selectValue = "Please enter a location ID!";
      toast.error(`${errors.selectValue}`);
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };
  /*  we do this in the getCurrent function now
  getLocation = async (location) => {
    //this works kinda
    const locationID = this.state.selectValue;
    http.get(config.apiEndpoint + "/location/" + locationID).then((res) => {
      this.setState({ location: res.data });
      console.log(res);
    });
  };*/

  /* we do this in getCurrent now
  getPrevTeam = async (prevTeam) => {
    const { locations } = this.state;

    const locationID = this.state.selectValue;

    for (let x in locations) {
      if (locationID === locations[x].location_id) {
        this.state.prevID = locations[x].team_id;
        //this.setState({ prevID: locations[x].team_id });
        break;
      }
    }
    //const prevTeamID = this.state.location.team_id;
    http.get(config.apiEndpoint + "/team/" + this.state.prevID).then((res) => {
      this.setState({ prevTeam: res.data });
      console.log("prev tem");
      console.log(res);
    });
  }; */
  /* we do this in getCurrent now
  giveRefund = async (prevTeam) => {
    const prevBid = this.state.location.high_bid; //old highest bid - refund this to old team
    const prevTeamBudget = prevTeam.budget;

    prevTeam.budget = parseInt(prevBid, 10) + parseInt(prevTeamBudget, 10);
    const { data1 } = await http.put(
      //refund previous team
      config.apiEndpoint + "/team/" + this.state.prevTeam.team_id,
      prevTeam
    );
    console.log(data1);
  };*/

  updateLocation = async (location) => {
    const locationID = this.state.selectValue;
    location.team_id = this.context.currentUser.teamID; //update location id and new highest bid
    location.high_bid = this.state.amount; //updates bid
    const { data } = await http.put(
      config.apiEndpoint + "/location/" + locationID,
      location
    );
    console.log(data);
  };

  updateNewTeamBudget = async (team) => {
    const budget = team.budget; // used to set api team.budget
    const amount = this.state.amount;
    team.budget = parseInt(budget, 10) - parseInt(amount, 10);
    this.context.currentUser.isHighestBid = true;
    team.ishighestbid = true;
    this.context.currentUser.budget = team.budget; //updates the context
    const { data3 } = await http.put(
      config.apiEndpoint + "/team/" + this.context.currentUser.teamID,
      team
    );
    this.state.team.budget = this.context.currentUser.budget;
    console.log(data3);
    this.setState({ amount: 0 });
  };

  getCurrent = async (location) => {
    const locationID = this.state.selectValue;
    const locationResponse = await http.get(
      config.apiEndpoint + "/location/" + locationID
    );
    this.setState({ location: locationResponse.data });

    const amount = this.state.amount;
    const previousBid = locationResponse.data.high_bid;

    const { locations } = this.state;
    for (let x in locations) {
      if (parseInt(locationID, 10) === locations[x].location_id) {
        this.state.prevID = locations[x].team_id;
        console.log("prev id");
        console.log(this.state.prevID);
        //this.setState({ prevID: locations[x].team_id });
        break;
      }
    }
    if (
      this.context.currentUser.isHighestBid === true &&
      this.state.prevID !== this.context.currentUser.teamID
    ) {
      toast.error("You are already a highest bidder!");
      return;
    }
    const PreviousTeam = await http.get(
      config.apiEndpoint + "/team/" + this.state.prevID
    );
    this.setState({ prevTeam: PreviousTeam.data });

    if (amount > previousBid) {
      const prevTeamBudget = PreviousTeam.data.budget;
      console.log("prevteamBudg");
      console.log(prevTeamBudget);
      this.state.prevTeam.ishighestbid = false;
      this.state.prevTeam.budget =
        parseInt(previousBid, 10) + parseInt(prevTeamBudget, 10);
      const { data1 } = await http.put(
        //refund previous team
        config.apiEndpoint + "/team/" + this.state.prevID,
        this.state.prevTeam
      );
      console.log(data1);
      //this.giveRefund(this.state.prevTeam);
      this.updateLocation(this.state.location);
      this.updateNewTeamBudget(this.state.team);
      console.log("amnt > prevbid");
      toast.success(`Bid entered!`);
    } else {
      toast.error(
        "Bid must be higher than the current bid of: $" +
          this.state.location.high_bid +
          " by team: " +
          this.state.prevID
      );
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate(); //error checking if negative or if no dropdown selected
    this.setState({ errors: errors || {} });
    if (errors) return;

    const bid = this.state.amount;
    const budget = this.state.team.budget; // used to set api team.budget

    const isBudgetNotNegative = parseInt(budget, 10) - parseInt(bid, 10);
    if (isBudgetNotNegative < 0) {
      toast.error("You don't have enough money!");
      return;
    }

    /*
    if (this.context.currentUser.isHighestBid === true && ) {
      toast.error("You are already a highest bidder!");
      return;
    }*/

    // this.getLocation(this.state.location);
    // this.getPrevTeam(this.state.prevTeam);
    this.getCurrent(this.state.location);
  };

  handleBidClear = (e) => {
    e.preventDefault();
    const { locations, team, locID, locClear } = this.state;

    for (let x in locations) {
      if (this.context.currentUser.teamID === locations[x].team_id) {
        // this.state.locID = locations[x].team_id;
        const locID = locations[x].location_id;
        console.log(locID);
        http.get(config.apiEndpoint + "/location/" + locID).then((res) => {
          this.setState({ locClear: res.data });
          const refund = res.data.high_bid;
          this.state.refund = res.data.high_bid;
          console.log(refund);
          res.data.high_bid = 0;
          res.data.team_id = 0;
          http.put(config.apiEndpoint + "/location/" + locID, res.data);
          http
            .get(
              config.apiEndpoint + "/team/" + this.context.currentUser.teamID
            )
            .then((res) => {
              const prevBudget1 = res.data.budget;
              const refund1 = this.state.refund;
              res.data.ishighestbid = false;
              console.log(prevBudget1);
              const newBudget =
                parseInt(prevBudget1, 10) + parseInt(refund1, 10);
              console.log(newBudget);
              res.data.budget = newBudget;
              this.context.currentUser.budget = res.data.budget;
              http.put(
                config.apiEndpoint + "/team/" + this.context.currentUser.teamID,
                res.data
              );
            });
        });

        break;
      }
    }
    /*
    http.get(config.apiEndpoint + "/location/" + locID).then((res) => {
      this.setState({ locClear: res.data });
    });

    const refund = this.state.locClear.high_bid;
    console.log(refund);
    locClear.team_id = 0;
    locClear.high_bid = 0;
    http.put(config.apiEndpoint + "/location/" + locID, locClear);*/
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  schema = {
    bid: Joi.number().required().label("Bid"),
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };
  setMark = (e) => {
    this.setState({ marks: [...this.state.marks, e.latLng] });
  };
  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value });
  }

  render() {
    const { errors, team, locations } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <div class="d-flex" id="wrapper">
          <SideBar></SideBar>
          <div id="page-content-wrapper">
            <nav className="navbar navbar-dark bg-dark">
              <h1 class="whiteFont">Location</h1>
            </nav>
            <nav className="navbar navbar-light bg-primary">
              Budget: {team.budget}{" "}
            </nav>
            <table class="table table-sm">
              <thead class="thead-light">
                <tr>
                  <th scope="col">Location ID</th>
                  <th scope="col">Current Highest Bidder</th>
                  <th scope="col">Bid Amount</th>
                </tr>
              </thead>
              <tbody>
                {locations.map((locations) => (
                  <tr key={locations.location_id}>
                    <td>{locations.location_id}</td>
                    <td>Team {locations.team_id}</td>
                    <td>${locations.high_bid}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div>
              <h1>Bid on a location!</h1>
              <form onSubmit={this.handleSubmit}>
                <label>
                  Select Location ID
                  <select
                    id="dropdown"
                    class=" form-control form-control-sm "
                    onChange={this.handleDropdownChange}
                    value={this.state.selectValue}
                  >
                    <option value="1">Location 1</option>
                    <option value="2">Location 2</option>
                    <option value="3">Location 3</option>
                    <option value="4">Location 4</option>
                  </select>
                </label>
                <div class="divider" />
                <label>
                  Amount $
                  <input
                    value={this.state.amount}
                    onChange={this.handleChange}
                    name="amount"
                    type="number"
                    class="form-control form-control-sm "
                    id="amount"
                    error={errors.amount}
                  />
                </label>
                <button
                  disabled={!this.context.currentUser.isManager}
                  type="submit"
                  class="btn btn-primary"
                  margin-top=".5em"
                >
                  Submit
                </button>
              </form>
            </div>
            <h1>Clear Bid!</h1>
            <button
              disabled={!this.context.currentUser.isManager}
              type="button"
              class="btn btn-warning"
              onClick={this.handleBidClear}
              margin-top=".5em"
            >
              Clear Current Bid
            </button>
            <Map
              google={this.props.google}
              zoom={14}
              style={mapStyles}
              initialCenter={{ lat: 33.7931, lng: -117.8521 }}
            >
              <Marker
                position={{ lat: 33.789, lng: -117.851 }}
                onClick={this.onMarkerClick}
                name={
                  <div>
                    <div>
                      <h1>Location 1</h1>
                      <img alt="store1" src={store1} height="300" />
                    </div>
                  </div>
                }
              />
              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}
              >
                <div>
                  <h4>{this.state.selectedPlace.name}</h4>
                </div>
              </InfoWindow>
              <Marker
                position={{ lat: 33.7931, lng: -117.85 }}
                onClick={this.onMarkerClick}
                name={
                  <div>
                    <div>
                      <h1>Location 2</h1>
                      <img alt="store2" src={store2} height="300" />
                    </div>
                  </div>
                }
              />
              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}
              >
                <div>
                  <h4>{this.state.selectedPlace.name}</h4>
                </div>
              </InfoWindow>
              <Marker
                position={{ lat: 33.7949, lng: -117.8556 }}
                onClick={this.onMarkerClick}
                name={
                  <div>
                    <div>
                      <h1>Location 3</h1>
                      <img alt="store3" src={store3} height="300" />
                    </div>
                  </div>
                }
              />
              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}
              >
                <div>
                  <h4>{this.state.selectedPlace.name}</h4>
                </div>
              </InfoWindow>
            </Map>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDMapDDxoJIp0a2IypH4LGwJ9-pgrTXh48",
})(locationComponent);
