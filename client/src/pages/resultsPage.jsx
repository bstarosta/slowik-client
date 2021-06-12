import React, { Component } from "react";
import WordInputBox from "../components/wordInuptBox";
import TabNav from "../components/tabNav";
import Tab from "../components/tab";
import "../App.css";
import "./resultsPage.css";
import ReactLoading from "react-loading";
import AppHeader from "../components/appHeader";
import AxiosClient from "../components/axiosClient";
import OccurencesTab from "../components/occurencesTab";
import ColocationsTab from "../components/colocationsTab";
import partsOfSpeechMap from "../components/cTagToPartOfSpeech"

class ResultsPage extends Component {
  constructor(props) {
    super(props);
    this.handleWordChange = this.handleWordChange.bind(this);
  }

  state = {
    corpusId: "",
    occurencesFiles: "",
    leftColocationsFiles: "",
    rightColocationsFiles: "",
    leftColocationRange: "1",
    rightColocationRange: "1",
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
      this.getDataFromServer();
    }
  };

  onChange = (e) => {
    this.setState({ fieldValue: e.target.value });
  };

  processOccurences(data) {
    let processedData = Object.entries(data).map(([fileName, count]) => ({
      fileName,
      count,
    }));
    console.log(processedData);
    return processedData;
  }

  getOccurencesFromServer = () => {
    AxiosClient.get(
      "/corpuses/" +
        this.state.corpusId +
        "/apperances?word=" +
        this.state.word +
        "&groupByFiles=true"
    ).then(
      (res) => {
        let occurences = this.processOccurences(res.data);
        this.setState({ occurencesFiles: occurences });
        this.setState({ stage: "Results" });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  processColocations(data) {
    let processedData = [];
    Object.entries(data).map(
      function(x) {
        return x[1].collocations.map(
          function(y) {
            let w = y.orth;
            let l = y.lexems[0].base;
            let c = partsOfSpeechMap[y.lexems[0].cTag.split(":")[0]] ? partsOfSpeechMap[y.lexems[0].cTag.split(":")[0]] : y.lexems[0].cTag.split(":")[0];
            processedData.push({
              word: w, 
              lexem: l, 
              cTag: c
            });
          }
        );
      }
    );
    console.log(processedData);
    return processedData;
  }
  
  getLeftColocationsFromServer = () => {
    AxiosClient.get(
      "/corpuses/" +
        this.state.corpusId +
        "/collocations?word=" +
        this.state.word +
        "&direction=" + "-" + this.state.leftColocationRange + "&scope=Sentence"
    ).then(
      (res) => {
        let leftColocations = this.processColocations(res.data);
        this.setState({ leftColocationsFiles: leftColocations });
        this.setState({ stage: "Results" });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  getRightColocationsFromServer = () => {
    AxiosClient.get(
      "/Corpuses/" +
        this.state.corpusId +
        "/collocations?word=" +
        this.state.word +
        "&direction=" + this.state.rightColocationRange + "&scope=Sentence"
    ).then(
      (res) => {
        let rightColocations = this.processColocations(res.data);
        this.setState({ rightColocationsFiles: rightColocations });
        this.setState({ stage: "Results" });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  getDataFromServer = () => {
    this.getOccurencesFromServer();
    this.getLeftColocationsFromServer();
    this.getRightColocationsFromServer();
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
        >
          <OccurencesTab
            word={this.state.word}
            occurences={this.state.occurencesFiles}
          ></OccurencesTab>
        </Tab>
        <Tab
          tabStyle="results-tab"
          isSelected={this.state.selected === "Colocations"}
        >
          <ColocationsTab
            word={this.state.word}
            leftColocations={this.state.leftColocationsFiles}
            rightColocations={this.state.rightColocationsFiles}
          ></ColocationsTab>
        </Tab>
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
          className="results-loading-animation"
        ></ReactLoading>
      </div>
    );
  }
}

export default ResultsPage;
