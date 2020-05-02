import React from 'react';
import { shallow } from 'enzyme';
import { PlayerCard } from './PlayerCard.js';
import { HumanPlayer } from '../HumanPlayer/HumanPlayer.js';
import { ComputerPlayer } from '../ComputerPlayer/ComputerPlayer.js';

const setup = (isHuman = true) => {
  const enzymeWrapper = shallow(<PlayerCard isHuman={isHuman} />)

  return {
    enzymeWrapper
  }
}

describe('<PlayerCard />', () => {
  it('renders a HumanPlayer if isHuman === true', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find(HumanPlayer)).toHaveLength(1);
  })

  it('renders a ComputerPlayer if isHuman === false', () => {
    const { enzymeWrapper } = setup(false);
    expect(enzymeWrapper.find(ComputerPlayer)).toHaveLength(1);
  })
})
