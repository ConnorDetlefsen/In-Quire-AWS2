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

      test: 0,

      prevID: 1,
      location: [],
      prevTeam: [],

      loc1: [],
      loc2: [],
      loc3: [],
      loc4: [],
      loc5: [],
      loc6: [],
      loc7: [],
      loc8: [],
      loc9: [],
      loc10: [],
      loc11: [],
      loc12: [],
      loc13: [],
      loc14: [],
      loc15: [],
      loc16: [],
      loc17: [],
      loc18: [],
      loc19: [],
      loc20: [],
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
    http.get(config.apiEndpoint + "/location/1").then((res) => {
      this.setState({ loc1: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/location/2").then((res) => {
      this.setState({ loc2: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/location/3").then((res) => {
      this.setState({ loc3: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/location/4").then((res) => {
      this.setState({ loc4: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/location/5").then((res) => {
      this.setState({ loc5: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/location/6").then((res) => {
      this.setState({ loc6: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/location/7").then((res) => {
      this.setState({ loc7: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/location/8").then((res) => {
      this.setState({ loc8: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/location/9").then((res) => {
      this.setState({ loc9: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/location/10").then((res) => {
      this.setState({ loc10: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/location/11").then((res) => {
      this.setState({ loc11: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/location/12").then((res) => {
      this.setState({ loc12: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/location/13").then((res) => {
      this.setState({ loc13: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/location/14").then((res) => {
      this.setState({ loc14: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/location/15").then((res) => {
      this.setState({ loc15: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/location/16").then((res) => {
      this.setState({ loc16: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/location/17").then((res) => {
      this.setState({ loc17: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/location/18").then((res) => {
      this.setState({ loc18: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/location/19").then((res) => {
      this.setState({ loc19: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/location/20").then((res) => {
      this.setState({ loc20: res.data });
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
    const amount = this.state.amount;
    console.log(amount);
    location.team_id = this.context.currentUser.teamID; //update location id and new highest bid
    location.high_bid = this.state.amount; //updates bid
    const { data } = await http.put(
      config.apiEndpoint + "/location/" + locationID,
      location
    );
    console.log(data);
    if (this.state.selectValue === "1") {
      this.state.loc1.team_id = parseInt(this.context.currentUser.teamID, 10);
      this.state.loc1.high_bid = amount;
      this.setState({ test: 1 });
    }
    if (this.state.selectValue === "2") {
      this.state.loc2.team_id = parseInt(this.context.currentUser.teamID, 10);
      this.state.loc2.high_bid = amount;
      this.setState({ test: 1 });
    }
    if (this.state.selectValue === "3") {
      this.state.loc3.team_id = parseInt(this.context.currentUser.teamID, 10);
      console.log(this.state.amount);
      this.state.loc3.high_bid = amount;
      this.setState({ test: 1 });
    }
    if (this.state.selectValue === "4") {
      this.state.loc4.team_id = parseInt(this.context.currentUser.teamID, 10);
      console.log(this.state.amount);
      this.state.loc4.high_bid = amount;
      this.setState({ test: 1 });
    }
    if (this.state.selectValue === "5") {
      this.state.loc5.team_id = parseInt(this.context.currentUser.teamID, 10);
      console.log(this.state.amount);
      this.state.loc5.high_bid = amount;
      this.setState({ test: 1 });
    }
    if (this.state.selectValue === "6") {
      this.state.loc6.team_id = parseInt(this.context.currentUser.teamID, 10);
      console.log(this.state.amount);
      this.state.loc6.high_bid = amount;
      this.setState({ test: 1 });
    }
    if (this.state.selectValue === "7") {
      this.state.loc7.team_id = parseInt(this.context.currentUser.teamID, 10);
      console.log(this.state.amount);
      this.state.loc7.high_bid = amount;
      this.setState({ test: 1 });
    }
    if (this.state.selectValue === "8") {
      this.state.loc8.team_id = parseInt(this.context.currentUser.teamID, 10);
      console.log(this.state.amount);
      this.state.loc8.high_bid = amount;
      this.setState({ test: 1 });
    }
    if (this.state.selectValue === "9") {
      this.state.loc9.team_id = parseInt(this.context.currentUser.teamID, 10);
      console.log(this.state.amount);
      this.state.loc9.high_bid = amount;
      this.setState({ test: 1 });
    }
    if (this.state.selectValue === "10") {
      this.state.loc10.team_id = parseInt(this.context.currentUser.teamID, 10);
      console.log(this.state.amount);
      this.state.loc10.high_bid = amount;
      this.setState({ test: 1 });
    }
    if (this.state.selectValue === "11") {
      this.state.loc11.team_id = parseInt(this.context.currentUser.teamID, 10);
      console.log(this.state.amount);
      this.state.loc11.high_bid = amount;
      this.setState({ test: 1 });
    }
    if (this.state.selectValue === "12") {
      this.state.loc12.team_id = parseInt(this.context.currentUser.teamID, 10);
      console.log(this.state.amount);
      this.state.loc12.high_bid = amount;
      this.setState({ test: 1 });
    }
    if (this.state.selectValue === "13") {
      this.state.loc13.team_id = parseInt(this.context.currentUser.teamID, 10);
      console.log(this.state.amount);
      this.state.loc13.high_bid = amount;
      this.setState({ test: 1 });
    }
    if (this.state.selectValue === "14") {
      this.state.loc14.team_id = parseInt(this.context.currentUser.teamID, 10);
      console.log(this.state.amount);
      this.state.loc14.high_bid = amount;
      this.setState({ test: 1 });
    }
    if (this.state.selectValue === "15") {
      this.state.loc15.team_id = parseInt(this.context.currentUser.teamID, 10);
      console.log(this.state.amount);
      this.state.loc15.high_bid = amount;
      this.setState({ test: 1 });
    }
    if (this.state.selectValue === "16") {
      this.state.loc16.team_id = parseInt(this.context.currentUser.teamID, 10);
      console.log(this.state.amount);
      this.state.loc16.high_bid = amount;
      this.setState({ test: 1 });
    }
    if (this.state.selectValue === "17") {
      this.state.loc17.team_id = parseInt(this.context.currentUser.teamID, 10);
      console.log(this.state.amount);
      this.state.loc17.high_bid = amount;
      this.setState({ test: 1 });
    }
    if (this.state.selectValue === "18") {
      this.state.loc18.team_id = parseInt(this.context.currentUser.teamID, 10);
      console.log(this.state.amount);
      this.state.loc18.high_bid = amount;
      this.setState({ test: 1 });
    }
    if (this.state.selectValue === "19") {
      this.state.loc19.team_id = parseInt(this.context.currentUser.teamID, 10);
      console.log(this.state.amount);
      this.state.loc19.high_bid = amount;
      this.setState({ test: 1 });
    }
    if (this.state.selectValue === "20") {
      this.state.loc20.team_id = parseInt(this.context.currentUser.teamID, 10);
      console.log(this.state.amount);
      this.state.loc20.high_bid = amount;
      this.setState({ test: 1 });
    }
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
    const { locations, team, locClear } = this.state;
    http.get(config.apiEndpoint + "/location/").then((res) => {
      this.state.locations = res.data;
    });

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
          this.state.locations[x].team_id = 0;
          http.put(config.apiEndpoint + "/location/" + locID, res.data);

          http
            .get(
              config.apiEndpoint + "/team/" + this.context.currentUser.teamID
            )
            .then((res) => {
              const prevBudget1 = res.data.budget;
              const refund1 = this.state.refund;
              const penalty = refund1 * 0.02;
              res.data.ishighestbid = false;
              this.context.currentUser.isHighestBid = false;
              const newBudget =
                parseInt(prevBudget1, 10) +
                parseInt(refund1, 10) -
                parseInt(penalty, 10);
              res.data.budget = newBudget;
              this.context.currentUser.budget = newBudget;
              this.state.team.budget = newBudget;
              this.setState({ test: 0 });
              http.put(
                config.apiEndpoint + "/team/" + this.context.currentUser.teamID,
                res.data
              );
            });

          const setToZero = 0;
          if (locID === 1) {
            this.state.loc1.team_id = parseInt(setToZero, 10);
            this.setState({ test: 1 });
          }
          if (locID === 2) {
            this.state.loc2.team_id = parseInt(setToZero, 10);
            this.setState({ test: 1 });
          }
          if (locID === 3) {
            this.state.loc3.team_id = parseInt(setToZero, 10);
            this.setState({ test: 1 });
          }
          if (locID === 4) {
            this.state.loc4.team_id = parseInt(setToZero, 10);
            this.setState({ test: 1 });
          }
          if (locID === 5) {
            this.state.loc5.team_id = parseInt(setToZero, 10);
            this.setState({ test: 1 });
          }
          if (locID === 6) {
            this.state.loc6.team_id = parseInt(setToZero, 10);
            this.setState({ test: 1 });
          }
          if (locID === 7) {
            this.state.loc7.team_id = parseInt(setToZero, 10);
            this.setState({ test: 1 });
          }
          if (locID === 8) {
            this.state.loc8.team_id = parseInt(setToZero, 10);
            this.setState({ test: 1 });
          }
          if (locID === 9) {
            this.state.loc9.team_id = parseInt(setToZero, 10);
            this.setState({ test: 1 });
          }
          if (locID === 10) {
            this.state.loc10.team_id = parseInt(setToZero, 10);
            this.setState({ test: 1 });
          }
          if (locID === 11) {
            this.state.loc11.team_id = parseInt(setToZero, 10);
            this.setState({ test: 1 });
          }
          if (locID === 12) {
            this.state.loc12.team_id = parseInt(setToZero, 10);
            this.setState({ test: 1 });
          }
          if (locID === 13) {
            this.state.loc13.team_id = parseInt(setToZero, 10);
            this.setState({ test: 1 });
          }
          if (locID === 14) {
            this.state.loc14.team_id = parseInt(setToZero, 10);
            this.setState({ test: 1 });
          }
          if (locID === 15) {
            this.state.loc15.team_id = parseInt(setToZero, 10);
            this.setState({ test: 1 });
          }
          if (locID === 16) {
            this.state.loc16.team_id = parseInt(setToZero, 10);
            this.setState({ test: 1 });
          }
          if (locID === 17) {
            this.state.loc17.team_id = parseInt(setToZero, 10);
            this.setState({ test: 1 });
          }
          if (locID === 18) {
            this.state.loc18.team_id = parseInt(setToZero, 10);
            this.setState({ test: 1 });
          }
          if (locID === 19) {
            this.state.loc19.team_id = parseInt(setToZero, 10);
            this.setState({ test: 1 });
          }
          if (locID === 20) {
            this.state.loc20.team_id = parseInt(setToZero, 10);
            this.setState({ test: 1 });
          }
        });
        toast.success("Previous Bid Cleared, 2% penalty taxed");
        break;
      }
      //   toast.error("You don't currently have a bid! If you do, reload the page");
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
            <nav className="navbar background">
              Budget: {team.budget}{" "}
            </nav>
            <br />
            <h1>
              <center>Bid on a location!</center>
            </h1>
            <h6>
              <center>* Map shown below</center>
            </h6>
            <div>
              <div class="container">
                <table class="table table-sm">
                  <thead class="thead-light">
                    <tr>
                      <th scope="col">Location ID</th>
                      <th scope="col">Current Highest Bidder</th>
                      <th scope="col">Bid Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.loc1.team_id !== 0 && (
                      <tr>
                        <td>{this.state.loc1.location_id}</td>
                        <td>{this.state.loc1.team_id}</td>
                        <td>{this.state.loc1.high_bid}</td>
                      </tr>
                    )}
                    {this.state.loc2.team_id !== 0 && (
                      <tr>
                        <td>{this.state.loc2.location_id}</td>
                        <td>{this.state.loc2.team_id}</td>
                        <td>{this.state.loc2.high_bid}</td>
                      </tr>
                    )}
                    {this.state.loc3.team_id !== 0 && (
                      <tr>
                        <td>{this.state.loc3.location_id}</td>
                        <td>{this.state.loc3.team_id}</td>
                        <td>{this.state.loc3.high_bid}</td>
                      </tr>
                    )}
                    {this.state.loc4.team_id !== 0 && (
                      <tr>
                        <td>{this.state.loc4.location_id}</td>
                        <td>{this.state.loc4.team_id}</td>
                        <td>{this.state.loc4.high_bid}</td>
                      </tr>
                    )}
                    {this.state.loc5.team_id !== 0 && (
                      <tr>
                        <td>{this.state.loc5.location_id}</td>
                        <td>{this.state.loc5.team_id}</td>
                        <td>{this.state.loc5.high_bid}</td>
                      </tr>
                    )}
                    {this.state.loc6.team_id !== 0 && (
                      <tr>
                        <td>{this.state.loc6.location_id}</td>
                        <td>{this.state.loc6.team_id}</td>
                        <td>{this.state.loc6.high_bid}</td>
                      </tr>
                    )}
                    {this.state.loc7.team_id !== 0 && (
                      <tr>
                        <td>{this.state.loc7.location_id}</td>
                        <td>{this.state.loc7.team_id}</td>
                        <td>{this.state.loc7.high_bid}</td>
                      </tr>
                    )}
                    {this.state.loc8.team_id !== 0 && (
                      <tr>
                        <td>{this.state.loc8.location_id}</td>
                        <td>{this.state.loc8.team_id}</td>
                        <td>{this.state.loc8.high_bid}</td>
                      </tr>
                    )}
                    {this.state.loc9.team_id !== 0 && (
                      <tr>
                        <td>{this.state.loc9.location_id}</td>
                        <td>{this.state.loc9.team_id}</td>
                        <td>{this.state.loc9.high_bid}</td>
                      </tr>
                    )}
                    {this.state.loc10.team_id !== 0 && (
                      <tr>
                        <td>{this.state.loc10.location_id}</td>
                        <td>{this.state.loc10.team_id}</td>
                        <td>{this.state.loc10.high_bid}</td>
                      </tr>
                    )}
                    {this.state.loc11.team_id !== 0 && (
                      <tr>
                        <td>{this.state.loc11.location_id}</td>
                        <td>{this.state.loc11.team_id}</td>
                        <td>{this.state.loc11.high_bid}</td>
                      </tr>
                    )}
                    {this.state.loc12.team_id !== 0 && (
                      <tr>
                        <td>{this.state.loc12.location_id}</td>
                        <td>{this.state.loc12.team_id}</td>
                        <td>{this.state.loc12.high_bid}</td>
                      </tr>
                    )}
                    {this.state.loc13.team_id !== 0 && (
                      <tr>
                        <td>{this.state.loc13.location_id}</td>
                        <td>{this.state.loc13.team_id}</td>
                        <td>{this.state.loc13.high_bid}</td>
                      </tr>
                    )}
                    {this.state.loc14.team_id !== 0 && (
                      <tr>
                        <td>{this.state.loc14.location_id}</td>
                        <td>{this.state.loc14.team_id}</td>
                        <td>{this.state.loc14.high_bid}</td>
                      </tr>
                    )}
                    {this.state.loc15.team_id !== 0 && (
                      <tr>
                        <td>{this.state.loc15.location_id}</td>
                        <td>{this.state.loc15.team_id}</td>
                        <td>{this.state.loc15.high_bid}</td>
                      </tr>
                    )}
                    {this.state.loc16.team_id !== 0 && (
                      <tr>
                        <td>{this.state.loc16.location_id}</td>
                        <td>{this.state.loc16.team_id}</td>
                        <td>{this.state.loc16.high_bid}</td>
                      </tr>
                    )}
                    {this.state.loc17.team_id !== 0 && (
                      <tr>
                        <td>{this.state.loc17.location_id}</td>
                        <td>{this.state.loc17.team_id}</td>
                        <td>{this.state.loc17.high_bid}</td>
                      </tr>
                    )}
                    {this.state.loc18.team_id !== 0 && (
                      <tr>
                        <td>{this.state.loc18.location_id}</td>
                        <td>{this.state.loc18.team_id}</td>
                        <td>{this.state.loc18.high_bid}</td>
                      </tr>
                    )}
                    {this.state.loc19.team_id !== 0 && (
                      <tr>
                        <td>{this.state.loc19.location_id}</td>
                        <td>{this.state.loc19.team_id}</td>
                        <td>{this.state.loc19.high_bid}</td>
                      </tr>
                    )}
                    {this.state.loc20.team_id !== 0 && (
                      <tr>
                        <td>{this.state.loc20.location_id}</td>
                        <td>{this.state.loc20.team_id}</td>
                        <td>{this.state.loc20.high_bid}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <form onSubmit={this.handleSubmit}>
                <center>
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
                      <option value="5">Location 5</option>
                      <option value="6">Location 6</option>
                      <option value="7">Location 7</option>
                      <option value="8">Location 8</option>
                      <option value="9">Location 9</option>
                      <option value="10">Location 10</option>
                      <option value="11">Location 11</option>
                      <option value="12">Location 12</option>
                      <option value="13">Location 13</option>
                      <option value="14">Location 14</option>
                      <option value="15">Location 15</option>
                      <option value="16">Location 16</option>
                      <option value="17">Location 17</option>
                      <option value="18">Location 18</option>
                      <option value="19">Location 19</option>
                      <option value="20">Location 20</option>
                    </select>
                  </label>
                  &emsp;&emsp;
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
                  &emsp;
                  <button
                    disabled={!this.context.currentUser.isManager}
                    type="submit"
                    class="btn btn-primary"
                    margin-top=".5em"
                  >
                    Submit
                  </button>
                  &emsp;&emsp;
                  <button
                    disabled={!this.context.currentUser.isManager}
                    type="button"
                    class="btn btn-warning"
                    onClick={this.handleBidClear}
                    margin-top=".5em"
                  >
                    Clear Current Bid
                  </button>
                </center>
              </form>
            </div>
            <br /> <br />
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
