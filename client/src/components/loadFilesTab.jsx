import React, { Component } from "react";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import "./loadFilesTab.css";

class LoadFilesTab extends Component {
  state = {
    stage: "Loading",
    corpusID: "030B4A82-1B7C-11CF-9D53-00AA003C9CB6",
  };

  setStage = (currentStage) => {
    this.setState({ stage: currentStage });
  };

  render() {
    if (this.state.stage === "Loading") {
      return (
        <div>
          <p className="header-text">Select files you want to upload</p>
          <p className="body-text">
            Select a ZIP file containing a corpus you want to process. The
            corpus must consist of text files in the following formats: pdf,
            txt, doc, docx, rtf. Processing your files may take a while. Please
            submit your e-mail so we can notify you when we're done.
          </p>
          <form className="corpus-form">
            <input className="form-control w-75" type="file"></input>
            <input
              className="form-control w-75 mt-2"
              type="email"
              placeholder="example@example.com"
            ></input>
            <input
              className="blue-button upload-button"
              type="submit"
              value="Upload"
              onClick={() => {
                this.setStage("Processing");
              }}
            ></input>
          </form>
        </div>
      );
    }

    if (this.state.stage === "Processing") {
      return (
        <React.Fragment>
          <p className="header-text">We are processing your files</p>
          <p className="body-text">
            Processing your files may take from a few seconds to a hours
            depending on the size of your corpus. We'll notify you and send an
            ID of your corpus to the submitted e-mail address.
          </p>
          <ReactLoading
            type="bars"
            color="#576490"
            height={"100px"}
            width={"100px"}
            className="loading-animation"
          />
          <button
            className="blue-button load-another-button"
            onClick={() => {
              this.setStage("Processed");
            }}
          >
            Load another corpus
          </button>
        </React.Fragment>
      );
    }

    if (this.state.stage === "Processed") {
      return (
        <React.Fragment>
          <p className="header-text">Your corpus has been processed</p>
          <p className="corpus-processed-text">
            We've managed to successfully process your files. You can proceed
            further or save your corpus ID for future use
          </p>
          <div className="id-display">
            <textarea
              className="id-text-area"
              rows="1"
              cols="50"
              readOnly={true}
              draggable="false"
              value={this.state.corpusID}
            ></textarea>
          </div>
          <div className="d-inline-flex justify-content-center w-100 results-button-area">
            <Link
              to={{ pathname: "/results", data: this.state.corpusID }}
              className="blue-button"
            >
              Results
            </Link>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default LoadFilesTab;
