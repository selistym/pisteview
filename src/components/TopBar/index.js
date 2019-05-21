import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './styles.css';

class TopBar extends Component {
  state = {
    links: [
      {
        id: '1',
        label: 'player',
        icon: 'fas fa-video',
        link: '/'
      },
      {
        id: '2',
        label: 'map',
        icon: 'fas fa-map-marker-alt',
        link: '/map'
      },
      {
        id: '3',
        label: 'menu',
        icon: 'fas fa-bars',
        link: '/menu'
      }
    ]
  };

  render() {
    const listItems = this.state.links.map((item) => {
      return (
        <li key={item.id}>
          <Link to={item.link} className={`${this.props.location.pathname === item.link ? 'active' : ''}`}>
            <i className={item.icon}></i>
          </Link>
        </li>
      )
    });

    return (
      <div className="top-bar">
        <div className="frame__title">
          <h1 className="app-title">Piste view</h1>
          <h2 className="resort-title">{this.props.resortName}</h2>
        </div>
        <ul className="frame__menu">
          {listItems}
        </ul>
      </div>
    );
  }
}

export default withRouter(TopBar);
