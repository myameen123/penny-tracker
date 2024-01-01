import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../redux/rootReducer'; // Update this import based on your project structure
import { Header } from './Header';

// Creating a mock store with initial state
const mockStore = createStore(rootReducer, {
  session: {
    user: { name: 'John Doe', email: 'john@example.com' }, // Example user data
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
test('renders Header component without crashing', () => {
  renderWithStore(<Header />);
  expect(screen.getByTestId('header-container')).toBeInTheDocument();
});

// User Information Display Test
test('displays user information correctly', () => {
  renderWithStore(<Header />);
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('john@example.com')).toBeInTheDocument();
});

// Logout Functionality Test
test('opens logout modal on logout button click', () => {
  renderWithStore(<Header />);
  const logoutButton = screen.getByTestId('logout-button');
  fireEvent.click(logoutButton);
  expect(screen.getByTestId('modal-logout')).toBeInTheDocument();
  expect(document.body.style.overflow).toBe('hidden'); // Checking if the body style was changed
});

// Additional tests can be added based on the specific functionality of the component
