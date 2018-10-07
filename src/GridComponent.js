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
    this.customSetState = this.customSetState.bind(this);
    this.state = {
      tree: new Node(this.props.defaultValue)
    }
  }

  customSetState(){
    this.treeArray = [];
    this.expandCollapseControlArray = [];
    this.preTraverse(this.state.tree);
    this.forceUpdate();
  }

  handleExpandClick(node) {
    node.left = new Node(node.value/2);
    node.right = new Node(node.value/2);
    this.customSetState();
  }

  handleCollapseClick(node) {
    node.left = null;
    node.right = null;
    this.customSetState();
  }

  handleValueChange(event, node, parentNode, siblingNode) {
    if ( event.target.value < parentNode.value && event.target.value > 0) {
      console.log('handleValueChange');
      node.value = event.target.value;
      siblingNode.value = parentNode.value - node.value;
      this.customSetState();
    }
  }


  preTraverse(node, parentNode, siblingNode){
    console.log('preTraverse');
    if(!node){
      return;
    }
    /* if(parentNode && siblingNode){
      node.value = parentNode.value/2;
    } */
    this.treeArray.push(
      <NodeComponent
        key={this.treeArray.length}
        className='grid-item'
        onChange={(!node.left && !node.right && parentNode && siblingNode) ? (event)=>this.handleValueChange(event, node, parentNode, siblingNode) : null}
        value={node.value}
      />
    );
    this.expandCollapseControlArray.push(
      <ExpandCollapseControl
        key={this.expandCollapseControlArray.length}
        expand={(!node.left && !node.right && node.value > 1) ? ()=>this.handleExpandClick(node) : null}
        collapse={(node.left && node.right) ? ()=>this.handleCollapseClick(node) : null}
      />
    );
    this.preTraverse(node.left, node, node.right);
    this.preTraverse(node.right, node, node.left);

  }

  componentDidMount(){
    console.log('componentDidMount');
    this.customSetState();
  }

  render() {
    console.log('render');
    console.log(this.state.tree);
    console.log(this.treeArray);

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
