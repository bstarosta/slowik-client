import React, { Component } from "react";
import "./colocationsTab.css";
import DataTable from "react-data-table-component";
import ColocationsSlider from "../components/colocationsSlider"
import {RangeStepInput} from 'react-range-step-input';
import "./colocationsSlider.css";



class ColocationsTab extends Component {

  constructor(props) {
    super(props);
  } 

  state = {
    crossSentenceLeft : false,
    crossSentenceRight : false,
    leftSliderValue: 1,
    rightSliderValue: 1,
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
              <div className="slider-wrapper">
                <div>
                  <RangeStepInput
                    min={1}
                    max={5}
                    value={this.state.leftSliderValue}
                    step={1}
                    onChange={this.handleLeftSlider.bind(this)}
                  />
                </div>
                <div className="slider-value">{this.state.leftSliderValue}</div>
              </div>
            </div>

            <div className="checkbox-field">
              <div className="checkbox">
                <input 
                  type="checkbox" 
                  checked={this.state.crossSentenceLeft} 
                  onChange={this.handleLeftCheckboxChange}/>
              </div>
              <div className="checkbox-header">Do not cross sentences</div>

            </div>
            

            <div>{this.renderLeftTable()}</div>
          </div>
          
          <div className="colocations-table">

          <div className="slider-field">
              <div className="slider-header">Colocation range</div>
              <div className="slider-wrapper">
                <div>
                  <RangeStepInput
                    min={1}
                    max={5}
                    value={this.state.rightSliderValue}
                    step={1}
                    onChange={this.handleRightSlider.bind(this)}
                  />
                </div>
                <div className="slider-value">{this.state.rightSliderValue}</div>
              </div>
            </div>

            <div className="checkbox-field">
              <div className="checkbox">
                <input 
                  type="checkbox" 
                  checked={this.state.crossSentenceRight} 
                  onChange={this.handleRightCheckboxChange}/>
              </div>
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

  handleLeftCheckboxChange = event => {
    if(this.state.crossSentenceLeft == false){
      this.setState({ crossSentenceLeft: true });
      this.props.handleLeftCheck(this.state.crossSentenceLeft);
    }
    else if(this.state.crossSentenceLeft == true){
      this.setState({ crossSentenceLeft: false });
      this.props.handleLeftCheck(this.state.crossSentenceLeft);
    }
  }
    

  handleRightCheckboxChange = event => {
    if(this.state.crossSentenceRight == false){
      this.setState({ crossSentenceRight: true });
      this.props.handleRightCheck(this.state.crossSentenceRight);
    }
    else if(this.state.crossSentenceRight == true){
      this.setState({ crossSentenceRight: false });
      this.props.handleRightCheck(this.state.crossSentenceRight);
    }
  }

  handleLeftSlider(e) {
    const newVal = Number(e.target.value);
    this.setState({leftSliderValue: newVal});
  }

  handleRightSlider(e) {
    const newVal = Number(e.target.value);
    this.setState({rightSliderValue: newVal});
  }
}

export default ColocationsTab;
