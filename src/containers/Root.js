import React from 'react';
import { connect } from 'react-redux';
import { fetchList } from '../ducks/list';
import Nodes from '../components/Nodes';
import Loader from '../components/common/Loader';


class Root extends React.PureComponent {
  componentDidMount() {
    this.props.fetchList();
  }

  render() {
    return (
      <div className="b-wrapper">
        {this.props.loading && <Loader/>}
        <div className="b-tree">
          <Nodes items={this.props.list} key={Date.now() + Math.random()} />
        </div>
        <div className="b-linear-bg" />
      </div>
    );
  }
}

export default connect(state => ({
  list: state.list.items,
  loading: state.list.loading,
}), { fetchList })(Root);
