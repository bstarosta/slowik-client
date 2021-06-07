import React, { Component } from "react";
import WordInputBox from "../components/wordInuptBox";

import AppHeader from "../components/appHeader";
import AxiosClient from "../components/axiosClient";

class ResultsPage extends Component {
  constructor(props) {
    super(props);
    this.handleWordChange = this.handleWordChange.bind(this);
  }

  state = {
    corpusId: "",
    occurencesFiles: "",
    word: "",
    wordNotFound: false,
    isWordInvalid: false,
  };

  handleWordChange(value) {
    this.setState({ word: value });
  }

  handleAnalyze = () => {
    if (this.state.word === "") this.setState({ isWordInvalid: true });
    else {
      this.setState({ isWordInvalid: false });
      this.getDataFromServer();
    }
  };

  onChange = (e) => {
    this.setState({ fieldValue: e.target.value });
  };

  getDataFromServer = () => {
    AxiosClient.get(
      "/corpuses/" +
        this.state.corpusId +
        "/apperances?word=" +
        this.state.word +
        "&groupByFiles=true"
    ).then(
      (res) => {
        this.setState({ occurencesFiles: res.data });
      },
      (error) => {
        console.log(error);
      }
    );
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
        <WordInputBox
          onWordChange={this.handleWordChange}
          handleAnalyze={this.handleAnalyze}
          isWordInvalid={this.state.isWordInvalid}
        />
        <div>{JSON.stringify(this.state.occurencesFiles)}</div>
      </React.Fragment>
    );
  }
}

export default ResultsPage;
