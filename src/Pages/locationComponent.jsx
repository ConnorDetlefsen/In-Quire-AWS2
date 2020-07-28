import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import Joi from "joi-browser";

const mapStyles = {
  width: "70%",
  height: "80%",
  color: "black",
};

export class locationComponent extends Component {
  state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
    markerList: [
      { lat: 33.789, lng: -117.851 },
      { lat: 33.79, lng: -117.858 },
      { lat: 33.81, lng: -177.839 },
      { lat: 33.756, lng: -177.849 },
    ],
    bid: 0,
    errors: {},
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

  render() {
    return (
      <React.Fragment>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{ lat: 33.7931, lng: -117.8521 }}
        >
          <Marker
            position={{ lat: 33.789, lng: -117.851 }}
            onClick={this.onMarkerClick}
            name={""}
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
            name={"Coffee Shop Location 2"}
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
            name={"Coffee Shop Location 3"}
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
      </React.Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDMapDDxoJIp0a2IypH4LGwJ9-pgrTXh48",
})(locationComponent);
