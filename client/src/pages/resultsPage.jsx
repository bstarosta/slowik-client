import React, { Component } from "react";
import WordInputBox from "../components/wordInuptBox";
import TabNav from "../components/tabNav";
import Tab from "../components/tab";
import "../App.css";
import ReactLoading from "react-loading";
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
    tabs: ["Occurences", "Colocations"],
    selected: "Occurences",
    stage: "Start",
  };

  setSelected = (tab) => {
    this.setState({ selected: tab });
  };

  handleWordChange(value) {
    this.setState({ word: value });
  }

  handleAnalyze = () => {
    if (this.state.word === "") this.setState({ isWordInvalid: true });
    else {
      this.setState({ stage: "Loading" });
      this.setState({ isWordInvalid: false });
      this.getOccurencesFromServer();
    }
  };

  onChange = (e) => {
    this.setState({ fieldValue: e.target.value });
  };

  getOccurencesFromServer = () => {
    AxiosClient.get(
      "/corpuses/" +
        this.state.corpusId +
        "/apperances?word=" +
        this.state.word +
        "&groupByFiles=true"
    ).then(
      (res) => {
        this.setState({ occurencesFiles: res.data });
        this.setState({ stage: "Results" });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  getDataFromServer = () => {
    this.getOccurencesFromServer();
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
        <div>{this.renderPageContent()}</div>
      </React.Fragment>
    );
  }

  renderPageContent() {
    if (this.state.stage === "Loading")
      return <React.Fragment>{this.renderLoading()}</React.Fragment>;
    if (this.state.stage === "Results")
      return <React.Fragment>{this.renderResults()}</React.Fragment>;
  }

  renderResults() {
    return (
      <TabNav
        tabs={this.state.tabs}
        selected={this.state.selected}
        setSelected={this.setSelected}
      >
        <Tab
          tabStyle="results-tab"
          isSelected={this.state.selected === "Occurences"}
        ></Tab>
        <Tab
          tabStyle="results-tab"
          isSelected={this.state.selected === "Colocations"}
        ></Tab>
      </TabNav>
    );
  }

  renderLoading() {
    return (
      <div>
        <ReactLoading
          type="spin"
          color="#576490"
          height={"100px"}
          width={"100px"}
          className="loading-animation"
        ></ReactLoading>
      </div>
    );
  }
}

export default ResultsPage;
