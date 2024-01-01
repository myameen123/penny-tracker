import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../redux/rootReducer'; // Update this import based on your project structure
import { DropdownMenu } from './DropdownMenu';

// Creating a mock store with initial state
const mockStore = createStore(rootReducer, {
  global: {
    isModalEditTransactionOpen: false,
    isModalAddTransactionOpen: false,
  },
  // Include other initial state if necessary
});

// Mock Props
const mockProps = {
  category: 'Example Category',
  onClick: jest.fn(),
};

// Utility function for rendering with Redux store
const renderWithStore = (component) => render(
  <Provider store={mockStore}>
    {component}
  </Provider>
);

// Render Test
test('renders DropdownMenu component without crashing', () => {
  renderWithStore(<DropdownMenu {...mockProps} />);
  expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
});

// Dropdown Interaction Test
test('opens and closes dropdown on click', () => {
  renderWithStore(<DropdownMenu {...mockProps} />);
  const dropdownButton = screen.getByTestId('dropdown-button');
  fireEvent.click(dropdownButton);
  expect(screen.getByTestId('dropdown-content')).toBeVisible();
  fireEvent.click(dropdownButton);
  expect(screen.getByTestId('dropdown-content')).not.toBeVisible();
});

// Category Selection Test
test('selects a category and calls onClick', () => {
  renderWithStore(<DropdownMenu {...mockProps} />);
  const dropdownItem = screen.getByText(mockProps.category);
  fireEvent.click(dropdownItem);
  expect(mockProps.onClick).toHaveBeenCalledWith(mockProps.category);
  expect(screen.getByTestId('dropdown-content')).not.toBeVisible();
});

// Redux State Interaction Test
test('reacts to Redux state changes', () => {
  const customStore = createStore(rootReducer, {
    global: {
      isModalEditTransactionOpen: true,
      isModalAddTransactionOpen: true,
    },
  });
  renderWithStore(<DropdownMenu {...mockProps} />);
  // Assertions to check if the component's behavior changes based on Redux state
  // This may involve verifying visibility or interactivity
});

// Additional tests can be added based on the specific functionality of the component
