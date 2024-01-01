import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../redux/rootReducer'; // Update this import based on your project structure
import Balance from './Balance';

// Creating a mock store with initial state
const mockStore = createStore(rootReducer, {
  finance: {
    balance: 1000.00, // Set the initial mock balance here
  },
  // Include other initial state if necessary
});

// Utility function for rendering with Redux store
const renderWithStore = (component) => render(
  <Provider store={mockStore}>
    {component}
  </Provider>
);

// Render Test
test('renders Balance component without crashing', () => {
  renderWithStore(<Balance />);
  expect(screen.getByText('Your balance')).toBeInTheDocument();
});

// Balance Display Test
test('displays the correct balance amount', () => {
  renderWithStore(<Balance />);
  expect(screen.getByText('1000.00 PKR')).toBeInTheDocument(); // The balance amount in the format displayed in the component
});