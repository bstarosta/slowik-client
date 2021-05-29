import React, { Component } from "react";

import AppHeader from "../components/appHeader";

class ResultsPage extends Component {
  state = {
    corpusId: "",
  };

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    this.setState({ corpusId: params.id });
  }

  render() {
    return (
      <React.Fragment>
        <AppHeader />
        {this.state.corpusId}
      </React.Fragment>
    );
  }
}

export default ResultsPage;
