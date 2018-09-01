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

  handleChange = (e) => {
    this.setState({
      valid: false,
      validMessages: null,
      title: e.target.value,
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

    if (val.length < 1 && val.length > 255) {
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
      valid,
    } = this.state;

    if (e.key === 'Enter' || e.key === 'Escape' || e.type === 'blur') {
      this.validate(title);

      if (valid) {
        e.target.blur();
        editAction(title, item._id);
      }
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
                    onBlur={this.handleSubmit}
                    name={`item${item._id}`}
                    onChange={this.handleChange}
                    value={this.state.title}

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
