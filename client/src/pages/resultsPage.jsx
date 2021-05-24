import React, { Component } from "react";

class ResultsPage extends Component {
  state = {};
  render() {
    const { data } = this.props.location;
    return <div> {data} </div>;
  }
}

export default ResultsPage;
