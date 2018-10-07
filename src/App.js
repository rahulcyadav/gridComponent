import React, { Component } from 'react';
import './styles/App.css';
import GridComponent from './GridComponent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { columns: 1, rows: 1, defaultValue: 128 };
    this.handleColumnsChange = this.handleColumnsChange.bind(this);
    this.handleRowsChange = this.handleRowsChange.bind(this);
    this.handleDefaultValueChange = this.handleDefaultValueChange.bind(this);
  }
  handleColumnsChange(event) {
    this.setState({columns: event.target.value});
  }
  handleRowsChange(event) {
    this.setState({rows: event.target.value});
  }
  handleDefaultValueChange(event) {
    this.setState({defaultValue: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <h2>Grid Component</h2>
        <form>
          <div>
            <label className='' htmlFor='columns'>Cols: </label>
            <input type='number' className='' id='columns' name='columns' value={this.state.columns} onChange={this.handleColumnsChange} disabled/>
          </div>
          {/* <div>
            <label className='' htmlFor='rows'>Rows: </label>
            <input type='number' className='' id='rows' name='rows' value={this.state.rows} onChange={this.handleRowsChange} />
          </div> */}
          <div>
            <label className='' htmlFor='defaultValue'>Default value: </label>
            <input type='number' min='2' step='2' className='' id='defaultValue' name='defaultValue' value={this.state.defaultValue} onChange={this.handleDefaultValueChange} />
          </div>
        </form>
        <GridComponent columns={this.state.columns} rows={this.state.rows} defaultValue={this.state.defaultValue} />
      </div>
    );
  }
}

export default App;
