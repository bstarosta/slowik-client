import React, { Component } from "react";
import "./occurencesTab.css";
import DataTable from "react-data-table-component";

class OccurencesTab extends Component {
  state = {};

  getTotalOccurences() {
    let total = 0;

    for (let i = 0; i < this.props.occurences.length; i++) {
      total += this.props.occurences[i].count;
    }
    return total;
  }

  render() {
    return (
      <div className="occurences-tab">
        <p className="occurences-header">
          Occurences of the word "{this.props.word}"
        </p>
        <p className="total-occurences">
          Total occurences: {this.getTotalOccurences()}
        </p>
        <div>
          <div className="occurences-table">{this.renderTable()}</div>
          <div></div>
        </div>
      </div>
    );
  }

  renderTable() {
    const columns = [
      {
        name: "Text file",
        selector: "fileName",
        sortable: true,
        width: "70%",
        allowOverflow: false,
      },
      {
        name: "Count",
        selector: "count",
        center: true,
        sortable: true,
        allowOverflow: false,
      },
    ];

    return (
      <React.Fragment>
        <DataTable
          title="Occurences in individual files"
          columns={columns}
          data={this.props.occurences}
          highlightOnHover
          fixedHeader
          fixedHeaderScrollHeight="300px"
        ></DataTable>
      </React.Fragment>
    );
  }
}

export default OccurencesTab;
