import React from 'react';

function Node(props) {
    return (
      <div className='inner-grid-item' >
        <input
          type='number'
          value={props.value}
          onChange={props.onChange ? (e)=>props.onChange(e) : null}
          onClick={(e)=>{e.stopPropagation()}}
          readOnly={!props.onChange}
        />
      </div>
    );
}

export default Node;
