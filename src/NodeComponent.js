import React, { Component } from 'react';
import './styles/App.css';
import GridComponent from './GridComponent';

class Node extends Component {
  constructor(props) {
    super(props);
    this.state = { left: 1, right: 1, value: 128 };
    this.handleColumnsChange = this.handleColumnsChange.bind(this);

  }
  handleColumnsChange(event) {
    this.setState({columns: event.target.value});
  }


  render() {
    return (
      <div
        /* key={this.state.treeArray.length} */
        className='grid-item'
        onClick={this.props.onClick}
      >
        <input type='number' value={this.props.value} onChange={this.props.onChange ? (e)=>this.props.onChange(e) : null} onClick={(e)=>{e.stopPropagation()}} readOnly={!this.props.onChange} />
      </div>
    );
  }
}

export default Node;
