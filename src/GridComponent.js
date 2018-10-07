import React from 'react';
import './styles/GridComponent.css';
import NodeComponent from './NodeComponent';
import ExpandCollapseControl from './ExpandCollapseControl';

function Node(value){
  this.value = value;
  this.left = null;
  this.right = null;
}

class GridComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.handleCollapseClick = this.handleCollapseClick.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.preTraverse = this.preTraverse.bind(this);
    this.state = {
      tree: new Node(this.props.defaultValue)
    }
  }

  handleExpandClick(node) {
    node.left = new Node(node.value/2);
    node.right = new Node(node.value/2);
    this.treeArray = [];
    this.expandCollapseControlArray = [];
    this.preTraverse(this.state.tree);
    this.forceUpdate();
  }

  handleCollapseClick(node) {
    node.left = null;
    node.right = null;
    this.treeArray = [];
    this.expandCollapseControlArray = [];
    this.preTraverse(this.state.tree);
    this.forceUpdate();
  }

  handleValueChange(event, node, parentNode, siblingNode) {
    if ( event.target.value < parentNode.value && event.target.value > 0) {
      node.value = event.target.value;
      siblingNode.value = parentNode.value - node.value;
    }
    this.treeArray = [];
    this.expandCollapseControlArray = [];
    this.preTraverse(this.state.tree);
    this.forceUpdate();
  }


  preTraverse(node, parentNode, siblingNode){
    console.log('preTraverse');
    if(!node){
      return;
    }
    this.treeArray.push(
      <NodeComponent
        key={this.treeArray.length}
        className='grid-item'
        onChange={(!node.left && !node.right && parentNode && siblingNode && node.value > 1) ? (event)=>this.handleValueChange(event, node, parentNode, siblingNode) : null}
        value={node.value}
      />
    );
    this.expandCollapseControlArray.push(
      <ExpandCollapseControl
        key={this.expandCollapseControlArray.length}
        expand={(!node.left && !node.right && node.value > 1) ? ()=>this.handleExpandClick(node) : null}
        collapse={(node.left && node.right) ? ()=>this.handleExpandClick(node) : null}
      />
    );
    this.preTraverse(node.left, node, node.right);
    this.preTraverse(node.right, node, node.left);

  }

  componentDidMount(){
    console.log('componentDidMount');
    this.treeArray = [];
    this.expandCollapseControlArray = [];
    this.preTraverse(this.state.tree);
    this.forceUpdate();

  }

  render() {
    console.log('render');
    console.log(this.state.tree);
    console.log(this.treeArray);

    // const gridItems = [];
    /* for (let i=0; i<this.props.rows; i++) {
      for (let j=0; j<this.props.columns; j++) {
        gridItems.push(<div key={i} className='grid-item' onClick={()=>this.handleExpandClick(i)} >{this.props.defaultValue}</div>)
      }
    } */
    // let node = this.state.tree;
    // while(node.value){
    //   gridItems.push(<div key={i} className='grid-item' onClick={()=>this.handleExpandClick(node)} >{this.props.value}</div>)
    // }

    return (
      <div className='grid-container'>
        <div className='grid-item'>
          {this.expandCollapseControlArray}
        </div>
        <div className='grid-item'>
          {this.treeArray}
        </div>
      </div>
    );
  }
}

export default GridComponent;
