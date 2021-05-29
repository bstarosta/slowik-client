import React, { Component } from "react";
import AppHeader from "../components/appHeader";

class ResultsPage extends Component {
  state = {};
  render() {
    const { data } = this.props.location;
    return (
      <React.Fragment>
        <AppHeader />
        {data}
      </React.Fragment>
    );
  }
}

export default ResultsPage;
