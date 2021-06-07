import React, { Component } from "react";
import "./wordInputBox.css";

class WordInputBox extends Component {
  state = {
    word: "",
    isWordInvalid: false,
    wordNotFounf: false,
    occurences: "",
  };

  render() {
    return (
      <div className="word-input-box">
        <div className="word-input-box-content">
          <div className="word-input-box-header-text">Enter a word</div>
          <div className="word-input-box-body-text">
            Enter a word you're interested in so we can provide statistics
            regarding colocations and occurences
          </div>
          <form>
            <input
              id="wordInput"
              className="form-control form-control w-75"
              type="text"
              placeholder="Enter a word"
            ></input>
            <div className="word-input-box-error-div">
              {this.renderWordError()}
            </div>
            <button className="word-input-box-button" type="button">
              Analyse
            </button>
          </form>
        </div>
      </div>
    );
  }

  renderWordError() {
    if (this.state.isWordInvalid) return "Enter a correct word";
  }
}

export default WordInputBox;
