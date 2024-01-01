import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../redux/rootReducer'; // Update this import based on your project structure
import DiagramTab from './DiagramTab';
import { Doughnut } from 'react-chartjs-2';
import { DropdownSelectYear, DropdownSelectMonth } from '../DropdownSelect/DropdownSelect';

// Creating a mock store with initial state
const mockInitialState = {
  session: {
    user: { id: 'user1' }, // Example user data
  },
  finance: {
    transactions: [], // Example transactions data
  },
};
const mockStore = createStore(rootReducer, mockInitialState);

// Mocking components and modules
jest.mock('react-chartjs-2', () => ({
  Doughnut: () => <canvas data-testid="doughnut-chart"></canvas>,
}));
jest.mock('../DropdownSelect/DropdownSelect', () => ({
  DropdownSelectYear: () => <div data-testid="dropdown-select-year"></div>,
  DropdownSelectMonth: () => <div data-testid="dropdown-select-month"></div>,
}));

// Utility function for rendering with Redux store
const renderWithStore = (component) => render(
  <Provider store={mockStore}>
    {component}
  </Provider>
);

// Render Test
test('renders DiagramTab component without crashing', () => {
  renderWithStore(<DiagramTab />);
  expect(screen.getByTestId('diagram-tab-container')).toBeInTheDocument();
});

// Doughnut Chart Rendering Test
test('renders Doughnut chart correctly', () => {
  renderWithStore(<DiagramTab />);
  expect(screen.getByTestId('doughnut-chart')).toBeInTheDocument();
});

// Dropdown Components Rendering Test
test('includes DropdownSelectYear and DropdownSelectMonth components', () => {
  renderWithStore(<DiagramTab />);
  expect(screen.getByTestId('dropdown-select-year')).toBeInTheDocument();
  expect(screen.getByTestId('dropdown-select-month')).toBeInTheDocument();
});

// Interaction Test - Year and Month Selection
test('updates chart data on year and month selection', () => {
  renderWithStore(<DiagramTab />);
  const yearDropdown = screen.getByTestId('dropdown-select-year');
  const monthDropdown = screen.getByTestId('dropdown-select-month');

  // Simulate selections
  fireEvent.change(yearDropdown, { target: { value: '2024' } });
  fireEvent.change(monthDropdown, { target: { value: 'January' } });

  // Assertions to verify chart data update can be added here
  // This may depend on how the component handles data updates
});

// Additional assertions and tests can be added as needed
