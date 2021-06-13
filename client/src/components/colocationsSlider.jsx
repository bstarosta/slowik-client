import React, { Component } from "react";
import {RangeStepInput} from 'react-range-step-input';
import "./colocationsSlider.css";

class ColocationsSlider extends Component {
    constructor(props) {
        super(props);
    } 

    state = {
        value: 1
    }

    render() {
        return (
            <div className="slider-wrapper">
                <div>
                    <RangeStepInput
                        min={1}
                        max={5}
                        value={this.state.value}
                        step={1}
                        onChange={this.onChange.bind(this)}
                    />
                </div>
                <div className="slider-value">{this.state.value}</div>
            </div>

        );
    }

    onChange(e) {
        const newVal = Number(e.target.value);
        this.setState({value: newVal});
    }
}

export default ColocationsSlider;
