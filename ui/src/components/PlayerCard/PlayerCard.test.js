import React from 'react';
import { shallow } from 'enzyme';
import { PlayerCard } from './PlayerCard.js';

const mockFunction = () => {
  // do nothing
}

describe('<PlayerCard />', () => {
  it('renders three <h3> components', () => {
    const wrapper = shallow(<PlayerCard rollDice={mockFunction}/>);
    expect(wrapper.find('h3')).toHaveLength(3);
  })
})
