import React from 'react';
import './styles/GridComponent.css';
import NodeComponent from './NodeComponent';

function Node(value){
  this.value = value;
  this.left = null;
  this.right = null;
}

class GridComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.preTraverse = this.preTraverse.bind(this);
    this.state = {
      tree: new Node(this.props.defaultValue),
      treeArray: []
    }
  }


  handleRowClick(node) {
    node.left = new Node(node.value/2);
    node.right = new Node(node.value/2);
    this.state.treeArray = [];
    // this.setState({treeArray: []});
    this.preTraverse(this.state.tree);
    this.forceUpdate();
  }

  handleValueChange(event, node, parentNode, siblingNode) {
    if ( event.target.value < parentNode.value && event.target.value > 0) {
      node.value = event.target.value;
      siblingNode.value = parentNode.value - node.value;
    }
    this.state.treeArray = [];
    this.preTraverse(this.state.tree);
    this.forceUpdate();
  }


  preTraverse(node, parentNode, siblingNode){
    console.log('preTraverse');
    if(!node){
      return;
    }
    // this.setState(prevState => (
    //   {
    //     treeArray: [
    //       ...prevState.treeArray,
    //       <div
    //         key={prevState.treeArray.length}
    //         className='grid-item'
    //         /* onClick={()=>this.handleRowClick(node)} */
    //         onClick={(!node.left && !node.right && node.value > 1) ? ()=>this.handleRowClick(node) : null}
    //       >
    //         {node.value}
    //       </div>
    //     ]
    //   }
    // ));
    this.state.treeArray.push(
      <NodeComponent
        key={this.state.treeArray.length}
        className='grid-item'
        onClick={(!node.left && !node.right && node.value > 1) ? ()=>this.handleRowClick(node) : null}
        onChange={(!node.left && !node.right && parentNode && siblingNode && node.value > 1) ? (event)=>this.handleValueChange(event, node, parentNode, siblingNode) : null}
        value={node.value}
      />
    );
    this.preTraverse(node.left, node, node.right);
    this.preTraverse(node.right, node, node.left);

  }

  componentDidMount(){
    console.log('componentDidMount');
    // this.setState({treeArray: []});
    this.state.treeArray = [];
    this.preTraverse(this.state.tree);
    this.forceUpdate();

  }

  render() {
    console.log('render');
    console.log(this.state.tree);
    console.log(this.state.treeArray);

    // const gridItems = [];
    /* for (let i=0; i<this.props.rows; i++) {
      for (let j=0; j<this.props.columns; j++) {
        gridItems.push(<div key={i} className='grid-item' onClick={()=>this.handleRowClick(i)} >{this.props.defaultValue}</div>)
      }
    } */
    // let node = this.state.tree;
    // while(node.value){
    //   gridItems.push(<div key={i} className='grid-item' onClick={()=>this.handleRowClick(node)} >{this.props.value}</div>)
    // }

    return (
      <div className='grid-container'>
        {this.state.treeArray}
      </div>
    );
  }
}

export default GridComponent;
