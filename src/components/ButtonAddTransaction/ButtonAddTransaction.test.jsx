import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../redux/rootReducer'; // Update this import based on your project structure
import { ButtonAddTransaction } from './ButtonAddTransaction';

// Creating a mock store with initial state
const mockStore = createStore(rootReducer, {
  // Set the initial state needed for the test
});

// Mock dispatch function
const mockDispatch = jest.fn();

// Mocking useDispatch from react-redux
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

// Utility function for rendering with Redux store
const renderWithStore = (component) => render(
  <Provider store={mockStore}>
    {component}
  </Provider>
);

// Render Test
test('renders ButtonAddTransaction component without crashing', () => {
  renderWithStore(<ButtonAddTransaction />);
  expect(screen.getByRole('button')).toBeInTheDocument();
});

// Click Event Test
test('dispatches action and changes body style on click', () => {
  renderWithStore(<ButtonAddTransaction />);
  fireEvent.click(screen.getByRole('button'));
  expect(mockDispatch).toHaveBeenCalled(); // Checks if dispatch was called
  expect(document.body.style.overflow).toBe('hidden'); // Checks if the body style was changed
});

// Reset mocks after tests
afterEach(() => {
  jest.clearAllMocks();
});

// Add any additional tests specific to the ButtonAddTransaction component's functionality
