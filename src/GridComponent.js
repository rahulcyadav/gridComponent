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
      tree: new Node(this.props.defaultValue),
      // pre-order traversed array of the tree
      treeArray: [],
      expandCollapseControlArray: []
    }
  }
  //function to refresh the tree array
  customSetState(){
    this.state.treeArray = [];
    this.state.expandCollapseControlArray = [];
    // this.setState({
    //   treeArray: [],
    //   expandCollapseControlArray: []
    // });
    this.preTraverse(this.state.tree);
    this.forceUpdate();
  }
  // plus button click handler to expand the tree node
  handleExpandClick(node) {
    node.left = new Node(node.value/2);
    node.right = new Node(node.value/2);
    this.customSetState();
  }
  // minus button click handler to collapse the tree node
  handleCollapseClick(node) {
    node.left = null;
    node.right = null;
    this.customSetState();
  }
  // change event handler for leaf node values whose siblings also have no children
  handleValueChange(event, node, parentNode, siblingNode) {
    if ( event.target.value < parentNode.value && event.target.value > 0) {
      console.log('handleValueChange');
      node.value = event.target.value;
      siblingNode.value = parentNode.value - node.value;
      this.customSetState();
    }
  }
  // function for pre-order traversal of the tree and population of the tree array to show on screen
  preTraverse(node, parentNode, siblingNode){
    console.log('preTraverse');
    if(!node){
      return;
    }
    this.state.treeArray.push(
      <NodeComponent
        key={this.state.treeArray.length}
        className='grid-item'
        onChange={(!node.left && !node.right && parentNode && siblingNode && !siblingNode.left && !siblingNode.right)
                  ? (event)=>this.handleValueChange(event, node, parentNode, siblingNode)
                  : null
                }
        value={node.value}
      />
    );
    this.state.expandCollapseControlArray.push(
      <ExpandCollapseControl
        key={this.state.expandCollapseControlArray.length}
        expand={(!node.left && !node.right && node.value > 1) ? ()=>this.handleExpandClick(node) : null}
        collapse={(node.left && node.right) ? ()=>this.handleCollapseClick(node) : null}
      />
    );
    this.preTraverse(node.left, node, node.right);
    this.preTraverse(node.right, node, node.left);

  }
  // triggers population of the tree array on first load
  componentDidMount(){
    console.log('componentDidMount');
    this.customSetState();
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (props.defaultValue !== state.tree.value) {
  //     this.preTraverse(new Node(props.defaultValue));
  //     return {
  //       tree: new Node(props.defaultValue),
  //       treeArray: [],
  //       expandCollapseControlArray: []
  //     };
  //   }
  //   return null;
  // }

  render() {
    console.log('render');
    console.log(this.state.tree);

    return (
      <div className='grid-container'>
        <div className='grid-item'>
          {this.state.expandCollapseControlArray}
        </div>
        <div className='grid-item'>
          {this.state.treeArray}
        </div>
      </div>
    );
  }
}

export default GridComponent;
