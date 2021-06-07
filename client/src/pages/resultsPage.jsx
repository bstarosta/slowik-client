import React, { Component } from "react";
import WordInputBox from "../components/wordInuptBox";

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
        <WordInputBox />
      </React.Fragment>
    );
  }
}

export default ResultsPage;
