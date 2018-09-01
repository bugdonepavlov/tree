import React from 'react';
import Node from './Node';

class Nodes extends React.PureComponent {
  render() {
    const {
      items,
    } = this.props;

    return (
      <ul
        className="tree"
      >
        {items.map(el => <Node item={el} key={el._id}/>)}
      </ul>
    );
  }
}

export default Nodes;
