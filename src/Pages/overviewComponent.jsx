import React, { Component } from "react";
import SideBar from "../Components/sideBar";
import UserContext from "../Context/UserContext";
import http from "../Services/httpService";
import config from "../config.json";

class overviewComponent extends Component {
  state = {
    team: [],
  };
  static contextType = UserContext;

  async componentDidMount() {
    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        console.log(res);
        this.context.currentUser.budget = res.budget; //using user id right now since the team ids are the same
      });
  }

  render() {
    return (
      <React.Fragment>
        <div class="d-flex" id="wrapper">
          <SideBar></SideBar>
          <div id="page-content-wrapper">
            <div className="container">
              <section className="col main">
                <div class="jumbotron">
                  <h1 class="display-4">
                    Hello, {this.context.currentUser.name}!
                  </h1>
                  <p class="lead">
                    Welcome to In-Quire Simulations! Continue with another
                    sentence here description
                  </p>
                  <hr class="my-4" />
                  <p>Below you will find more information!</p>
                  <div>
                    <iframe
                      title="video"
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/PYH5uxMulk8"
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <h1 className="title">Overview</h1>
                <h2 className="overview-round-bar">Round 1</h2>
                <p className="body box">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  ornare placerat posuere. Aliquam orci mauris, laoreet vitae
                  eros vitae, ultricies maximus urna. Nullam elementum nunc
                  nisl, vitae congue tortor viverra vitae. Nulla ante elit,
                  scelerisque quis gravida et, fringilla id urna. Duis
                  ullamcorper lacinia dolor consectetur placerat. Sed vehicula
                  quis lorem nec euismod. Maecenas ullamcorper lorem sed
                  sollicitudin gravida. Nullam eget eros eleifend, venenatis mi
                  et, varius ligula. Sed vel pulvinar est. Aliquam sit amet
                  velit lacus. Quisque condimentum libero at sem pharetra, nec
                  bibendum dolor sollicitudin. Praesent a lectus nec justo
                  tristique pretium vel a velit. Vestibulum pretium turpis eu
                  egestas lacinia. Mauris non porttitor turpis, quis
                  sollicitudin velit. Praesent mattis aliquam lorem, non gravida
                  quam ultricies id. Vestibulum blandit consectetur nisl non
                  faucibus. Praesent iaculis vestibulum dolor, vitae elementum
                  felis mattis sodales. Etiam sed interdum eros. Donec convallis
                  dictum massa sit amet bibendum. Quisque sed ante sem. Donec
                  pharetra massa ac erat lobortis scelerisque. Quisque at tortor
                  pulvinar, sodales diam nec, lacinia sapien. Aliquam sagittis,
                  dolor eget bibendum maximus, metus ante tempor mauris, vel
                  pellentesque tellus felis ac justo. Mauris finibus leo ac ex
                  congue, egestas rutrum quam sodales.
                </p>
                <div>
                  <iframe
                    title="video"
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/PYH5uxMulk8"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </section>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default overviewComponent;
