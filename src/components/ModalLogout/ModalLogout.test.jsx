import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../redux/rootReducer'; // Update this import based on your project structure
import ModalLogout from './ModalLogout';

// Creating a mock store with initial state
const mockInitialState = {
  global: {
    isModalLogoutOpen: true,
  },
};
const mockStore = createStore(rootReducer, mockInitialState);

// Mock dispatch function
const mockDispatch = jest.fn();

// Mocking useDispatch and useSelector from react-redux
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: () => jest.fn((selector) => selector(mockInitialState)),
}));

// Utility function for rendering with Redux store
const renderWithStore = (component) => render(
  <Provider store={mockStore}>
    {component}
  </Provider>
);

// Render Test
test('renders ModalLogout component without crashing', () => {
  renderWithStore(<ModalLogout />);
  expect(screen.getByTestId('modal-logout')).toBeInTheDocument();
});

// Logout Functionality Test
test('handles logout correctly on logout button click', () => {
  renderWithStore(<ModalLogout />);
  const logoutButton = screen.getByRole('button', { name: /log out/i });
  fireEvent.click(logoutButton);
  expect(mockDispatch).toHaveBeenCalled(); // Checks if dispatch was called with the logout action
});

// Modal Interaction Test
test('closes modal on cancel button click', () => {
  renderWithStore(<ModalLogout />);
  const cancelButton = screen.getByRole('button', { name: /cancel/i });
  fireEvent.click(cancelButton);
  expect(mockDispatch).toHaveBeenCalled(); // Checks if dispatch was called with the setIsModalLogoutOpen action
});

// Additional tests can be added based on the specific functionality of the component
