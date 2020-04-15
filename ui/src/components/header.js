import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.css'

class Header extends Component {
  render() {
    return (
      <div className='GameHeader'>
        <h2> Start New Game </h2>
        <ul>
          <li>
            <Link to="/">New Game</Link>
          </li>
          <li>
            <Link to="/match">Current Game</Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default Header
