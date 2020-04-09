import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const h2Element = getByText(/Start New Game/i);
  expect(h2Element).toBeInTheDocument();
});
