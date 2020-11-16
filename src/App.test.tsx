import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { act } from 'react-dom/test-utils';


test('successfully fetched API data and rendered to screen', async () => {
  render(<App />);

  expect(await screen.findByText(/Contact/)).toBeInTheDocument();
});
