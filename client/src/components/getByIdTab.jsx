import React, { Component } from "react";
import "./getByIdTab.css";

class GetByIdTab extends Component {
  state = {};

  handleGetId = () => {};

  render() {
    return (
      <div>
        <p className="header-text">Enter your corpus ID</p>
        <p className="body-text">Enter an ID of a previously uploaded corpus</p>
        <form>
          <input
            id="idInput"
            className="form-control form-control-lg id-input w-75"
            type="text"
            placeholder="Enter your corpus ID"
          ></input>
          <input
            className="next-button"
            type="submit"
            value="Next"
            onClick={() => {
              this.handleGetId();
            }}
          ></input>
        </form>
      </div>
    );
  }
}

export default GetByIdTab;