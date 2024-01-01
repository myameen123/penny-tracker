import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../redux/rootReducer'; // Update this import based on your project structure
import ModalAddTransaction from './ModalAddTransaction';

// Creating a mock store with initial state
const mockInitialState = {
  global: {
    isModalAddTransactionOpen: true,
  },
  session: {
    user: { id: 'user1', name: 'John Doe' },
  },
};
const mockStore = createStore(rootReducer, mockInitialState);

// Mock dispatch function
const mockDispatch = jest.fn();

// Utility function for rendering with Redux store
const renderWithStore = (component) => render(
  <Provider store={mockStore}>
    {component}
  </Provider>
);

// Render Test
test('renders ModalAddTransaction component without crashing', () => {
  renderWithStore(<ModalAddTransaction />);
  expect(screen.getByTestId('modal-add-transaction')).toBeInTheDocument();
});

// Form Interaction Test
test('handles form input and submission', () => {
  renderWithStore(<ModalAddTransaction />);
  fireEvent.change(screen.getByLabelText(/amount/i), { target: { value: '100' } });
  fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Groceries' } });
  fireEvent.click(screen.getByRole('button', { name: /add transaction/i }));
  // Check if the addTransaction action is dispatched
  // This will depend on your Redux setup and the component's implementation
});

// Modal Interaction Test
test('closes modal on cancel button click', () => {
  renderWithStore(<ModalAddTransaction />);
  const cancelButton = screen.getByRole('button', { name: /cancel/i });
  fireEvent.click(cancelButton);
  // Check if the setIsModalAddTransactionOpen action is dispatched with false
});

// Additional tests can be added based on the specific functionality of the component
