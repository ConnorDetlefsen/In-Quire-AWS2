import React, { Component } from "react";
import Info from "../Components/teamInfo";

class overviewComponent extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <Info></Info>
          <section className="col main">
            <h1 className="title">Overview</h1>
            <h2 className="overview-round-bar">Round 1</h2>
            <p className="body box">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              ornare placerat posuere. Aliquam orci mauris, laoreet vitae eros
              vitae, ultricies maximus urna. Nullam elementum nunc nisl, vitae
              congue tortor viverra vitae. Nulla ante elit, scelerisque quis
              gravida et, fringilla id urna. Duis ullamcorper lacinia dolor
              consectetur placerat. Sed vehicula quis lorem nec euismod.
              Maecenas ullamcorper lorem sed sollicitudin gravida. Nullam eget
              eros eleifend, venenatis mi et, varius ligula. Sed vel pulvinar
              est. Aliquam sit amet velit lacus. Quisque condimentum libero at
              sem pharetra, nec bibendum dolor sollicitudin. Praesent a lectus
              nec justo tristique pretium vel a velit. Vestibulum pretium turpis
              eu egestas lacinia. Mauris non porttitor turpis, quis sollicitudin
              velit. Praesent mattis aliquam lorem, non gravida quam ultricies
              id. Vestibulum blandit consectetur nisl non faucibus. Praesent
              iaculis vestibulum dolor, vitae elementum felis mattis sodales.
              Etiam sed interdum eros. Donec convallis dictum massa sit amet
              bibendum. Quisque sed ante sem. Donec pharetra massa ac erat
              lobortis scelerisque. Quisque at tortor pulvinar, sodales diam
              nec, lacinia sapien. Aliquam sagittis, dolor eget bibendum
              maximus, metus ante tempor mauris, vel pellentesque tellus felis
              ac justo. Mauris finibus leo ac ex congue, egestas rutrum quam
              sodales.
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
      </React.Fragment>
    );
  }
}

export default overviewComponent;
