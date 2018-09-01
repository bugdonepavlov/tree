import React from 'react';
import { connect } from 'react-redux';
import { editAction } from '../ducks/list';
import Nodes from './Nodes';

class Node extends React.PureComponent {
  state = {
    title: '',
    prevTitle: '',
    valid: '',
    validMessages: '',
  }

  static getDerivedStateFromProps(newProps, prevState){
    if (prevState.prevTitle !== newProps.item.title) {
      return ({
        title: newProps.item.title,
        prevTitle: newProps.item.title,
      });
    }

    return null;
  }

  handleFocus(e) {
    e.target.setSelectionRange(0, e.target.value.length);
  }

  handleChange = (e) => {
    this.setState({
      valid: false,
      validMessages: null,
      title: e.target.value,
    }, () => {
      this.validate(this.state.title);
    });
  }

  validate = (val) => {
    const {
      data,
    } = this.props;

    if (
      data.some(e => (
        e.title.toLowerCase() === val.toLowerCase()
      ))
    ) {
      return this.setState({
        valid: true,
        validMessages: 'Что-то пошло не так, такой подпункт(пункт, строка) уже есть, айайайай, давай по новой',
      });
    }

    if (val.length < 1 || val.length > 255) {
      return this.setState({
        valid: true,
        validMessages: 'Неее, нужно что было от 1 до 255 максимум символов',
      })
    }

    this.setState({
      valid: false,
      validMessages: null,
    });
  }

  handleSubmit = (e) => {
    const {
      item,
      editAction,
    } = this.props;

    const {
      title,
      prevTitle,
      valid,
    } = this.state;

    if (
      title !== prevTitle
      && !valid
      && (
        e.key === 'Enter'
        || e.key === 'Escape'
        || e.type === 'blur'
      )
    ) {
      e.target.blur();
      editAction(title, item._id);
    }
  }

  render() {
    const {
      item,
    } = this.props;

    const {
      validMessages,
      valid,
    } = this.state;

    return (
      <li
        className="tree__item"
      >
        {
          item.parent !== null
            ?
              (
                <div className="input-group">
                  <input
                    className={valid ? 'error-input' : ''}
                    onKeyUp={this.handleSubmit}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    value={this.state.title}
                    name={`item${item._id}`}
                  />
                  {valid && <div className="error">{validMessages}</div>}
                </div>
              )
            : <span className="tree__parent-caption">{item.title}</span>
        }

        {
          item.children.length > 0
            ? <Nodes key={Date.now() + Math.random()} items={item.children} />
            : null
        }
      </li>
    );
  }
}

export default connect((state => ({
  data: state.list.data,
})), { editAction })(Node);
