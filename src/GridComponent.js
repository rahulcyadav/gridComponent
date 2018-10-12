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
    let grid = [];
    for(let i = 0; i < this.props.columns; i++){
      grid.push(new Node(this.props.defaultValue));
    }

    this.state = {
      grid: grid,
    }
  }

  // plus button click handler to expand the tree node
  handleExpandClick(node) {
    node.left = new Node(node.value/2);
    node.right = new Node(node.value/2);
    this.forceUpdate();
    console.log('handleExpandClick:', node)
  }
  // minus button click handler to collapse the tree node
  handleCollapseClick(node) {
    node.left = null;
    node.right = null;
    this.forceUpdate();
  }
  // change event handler for leaf node values whose siblings also have no children
  handleValueChange(event, node, parentNode, siblingNode) {
    if ( event.target.value < parentNode.value && event.target.value > 0) {
      console.log('handleValueChange');
      node.value = event.target.value;
      siblingNode.value = parentNode.value - node.value;
      this.forceUpdate();
    }
  }

  static getDerivedStateFromProps(props, state) {
    // if (props.defaultValue !== state.grid[0].value) {
      let grid = [];
      for(let i = 0; i < props.columns; i++){
        grid.push(new Node(props.defaultValue));
      }
      return {
        grid: grid
      };
    // }
    // return null;
  }

  render() {
    console.log('render');
    console.log(this.state.grid);
    const gridArray = [];
    this.state.grid.forEach(tree=>{
      gridArray.push([]);
    })
    const expandCollapseControlArray = [];

    // function for pre-order traversal of the tree and population of the tree array to show on screen
    function preTraverse(index, node, parentNode, siblingNode){
      console.log('preTraverse');
      if(!node){
        return;
      }
      gridArray[index].push({
        nodeComponent: (<NodeComponent
          key={gridArray[index].length}
          className='grid-item'
          onChange={(!node.left && !node.right && parentNode && siblingNode && !siblingNode.left && !siblingNode.right)
                    && ( (event) => ( this.handleValueChange(event, node, parentNode, siblingNode) ) )
                  }
          value={node.value}
        />),
        nodeRef: node

      });

      if(index===0){
        expandCollapseControlArray.push(
          <ExpandCollapseControl
          key={expandCollapseControlArray.length}
          expand={ ( !node.left && !node.right && node.value > 1 ) && ( ()=>this.handleExpandClick(node) ) }
          collapse={ ( node.left && node.right ) && ( ()=>this.handleCollapseClick(node) ) }
          />
        );
      }

      preTraverse.call(this, index, node.left, node, node.right);
      preTraverse.call(this, index, node.right, node, node.left);
    }

    this.state.grid.forEach((tree, index)=>{
      preTraverse.call(this, index, tree);
    })

    return (
      <div className='grid-container' style={{gridTemplateColumns: `10% repeat(${this.props.columns}, auto)`}}>
        <div className='grid-item'>
          {expandCollapseControlArray}
        </div>
        {gridArray.map( (tree, index) => (<div className='grid-item' key={`grid-item-${index}`} >{tree.map(node=>node.nodeComponent)}</div>) )}
      </div>
    );
  }
}

export default GridComponent;
