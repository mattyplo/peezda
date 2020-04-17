import React from 'react';
import ReactDOM from 'react-dom';
import PlayerCard from './PlayerCard.js';

it('PlayerCard renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PlayerCard />, div);
  ReactDOM.unmountComponentAtNode(div);
});
