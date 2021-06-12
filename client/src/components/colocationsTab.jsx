import React, { Component } from "react";
import "./colocationsTab.css";
import DataTable from "react-data-table-component";
import ColocationsSlider from "../components/colocationsSlider"

const CheckboxLeft = props => (
  <input type="checkbox" {...props} />
)

const CheckboxRight = props => (
  <input type="checkbox" {...props} />
)

class ColocationsTab extends Component {
  state = {
    crossSentenceLeft : false,
    crossSentenceRight : false
  };

  render() {
    return (
      <div className="colocations-tab">
        <p className="colocations-header">
          Collocations of the word "{this.props.word}"
        </p>
        <div className="data-presentation">

          <div className="colocations-table">

            <div className="slider-field">
              <div className="slider-header">Colocation range</div>
              <div className="slider">{this.renderSlider()}</div>
            </div>

            <div className="checkbox-field">
              <div className="checkbox"><CheckboxLeft/></div>
              <div className="checkbox-header">Do not cross sentences</div>

            </div>
            

            <div>{this.renderLeftTable()}</div>
          </div>
          
          <div className="colocations-table">

          <div className="slider-field">
              <div className="slider-header">Colocation range</div>
              <div className="slider">{this.renderSlider()}</div>
            </div>

            <div className="checkbox-field">
              <div className="checkbox"><CheckboxRight/></div>
              <div className="checkbox-header">Do not cross sentences</div>

            </div>

            <div>{this.renderRightTable()}</div>
          </div>
          
        </div>
      </div>
    );
  }

  renderSlider() {
    return (
      // <RangeStepInput></RangeStepInput>
      <ColocationsSlider/>
    );
  }
  renderLeftTable() {
    const columns = [
      {
        name: "Word",
        selector: "word",
        sortable: true,
        width: "25%",
        allowOverflow: false,
      },
      {
        name: "Lexem",
        selector: "lexem",
        sortable: true,
        width: "25%",
        allowOverflow: false,
      },
      {
        name: "Part of speech",
        selector: "cTag",
        sortable: true,
        width: "50%",
        allowOverflow: false,
      },
    ];

    return (
      <React.Fragment>
        <DataTable
          title="Left colocations"
          columns={columns}
          data={this.props.leftColocations}
          highlightOnHover
          fixedHeader
          fixedHeaderScrollHeight="300px"
        ></DataTable>
      </React.Fragment>
    );
  }

  renderRightTable() {
    const columns = [
      {
        name: "Word",
        selector: "word",
        sortable: true,
        width: "25%",
        allowOverflow: false,
      },
      {
        name: "Lexem",
        selector: "lexem",
        sortable: true,
        width: "25%",
        allowOverflow: false,
      },
      {
        name: "Part of speech",
        selector: "cTag",
        sortable: true,
        width: "50%",
        allowOverflow: false,
      },
    ];

    return (
      <React.Fragment>
        <DataTable
          title="Right colocations"
          columns={columns}
          data={this.props.rightColocations}
          highlightOnHover
          fixedHeader
          fixedHeaderScrollHeight="300px"
        ></DataTable>
      </React.Fragment>
    );
  }

  handleLeftCheckboxChange = event =>
    this.setState({ crossSentenceLeft: event.target.crossSentenceLeft })

  handleRightCheckboxChange = event =>
    this.setState({ crossSentenceRight: event.target.crossSentenceright })

}

export default ColocationsTab;
