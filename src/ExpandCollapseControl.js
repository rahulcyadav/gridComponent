import React from 'react';

function ExpandCollapseControl(props) {
    return (
      <div className='inner-grid-item'>
        <button type="button" onClick={props.expand}>+</button>
        { props.collapse && <button type="button" onClick={props.collapse}>-</button> }
      </div>
    );
}

export default ExpandCollapseControl;
