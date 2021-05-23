import React from 'react';
import './App.css';
import AppHeader from "./components/appHeader";
import TabNav from "./components/tabNav"
import Tab from "./components/tab"
import GetByIdTab from "./components/getByIdTab"

class App extends React.Component {
  
  state = {
    tabs : ["Load files", "Get by ID"],
    selected : "Load files"
  }

  setSelected = (tab) => {
    this.setState({selected: tab})
  }

  render() { return (
    <div>
      <AppHeader/>
      <div>
        <TabNav tabs={this.state.tabs} selected={this.state.selected} setSelected={this.setSelected} >
          <Tab isSelected={this.state.selected==="Load files"}>
          </Tab>
          <Tab isSelected={this.state.selected==="Get by ID"}>
            <GetByIdTab/>
          </Tab>
        </TabNav>
      </div>
    </div>
  );
  }
}

export default App;
