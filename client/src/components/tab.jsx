import React, { Component } from "react";
import "./tab.css";

class Tab extends Component {
  render() {
    if (this.props.isSelected) {
      return <div className="tab">{this.props.children}</div>;
    }
    return null;
  }
}

export default Tab;
