import React, { Component } from 'react';

class Setting extends Component {
	shouldComponentUpdate (nextProps, nextState) {
		return nextProps.currentValue !== this.props.currentValue;
	}
	
  handleOnClick = (e) => {
    const {id, value} = e.target.dataset;
    const { name } = this.props;

    this.props.handleOnClick(name, id, value);
  };

  render() {
    const { label, currentValue, options } = this.props;    

    return (
      <li className="popup-menu__item">
        <span className="popup-menu__label">
          {label}
        </span>

        <ul className="popup-menu__options">
          {
            options.map(item => (
              <li key={item.id}>
                <span
                  data-id={item.id}
                  data-value={item.value}
                  className={`label ${+item.id === +currentValue ? 'active' : ''}`}
                  onClick={this.handleOnClick}
                >
                  {`${item.string}`}
                </span>
              </li>
            ))
          }
        </ul>
      </li>
    );
  }
}

export default Setting;
