import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../redux/rootReducer'; // Update this import based on your project structure
import ModalEditTransaction from './ModalEditTransaction';

// Creating a mock store with initial state
const mockInitialState = {
  global: {
    isModalEditTransactionOpen: true,
    transactionId: 'tx1',
  },
  finance: {
    transactions: [{ id: 'tx1', amount: 100, description: 'Groceries', category: 'Food' }], // Example transactions data
  },
};
const mockStore = createStore(rootReducer, mockInitialState);

// Utility function for rendering with Redux store
const renderWithStore = (component) => render(
  <Provider store={mockStore}>
    {component}
  </Provider>
);

// Render Test
test('renders ModalEditTransaction component without crashing', () => {
  renderWithStore(<ModalEditTransaction />);
  expect(screen.getByTestId('modal-edit-transaction')).toBeInTheDocument();
});

// Form Fields Test
test('contains input fields with existing transaction data', () => {
  renderWithStore(<ModalEditTransaction />);
  expect(screen.getByDisplayValue('Groceries')).toBeInTheDocument();
  expect(screen.getByDisplayValue('100')).toBeInTheDocument();
  // Add more assertions for other fields like category
});

// Form Submission Test
test('submits updated transaction data', () => {
  renderWithStore(<ModalEditTransaction />);
  fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'New Description' } });
  fireEvent.change(screen.getByLabelText(/amount/i), { target: { value: '200' } });
  fireEvent.click(screen.getByRole('button', { name: /update/i }));
  // Check if the updateTransaction action is dispatched
  // This will depend on your Redux setup and the component's implementation
});

// Modal Interaction Test
test('closes modal on cancel button click', () => {
  renderWithStore(<ModalEditTransaction />);
  const cancelButton = screen.getByRole('button', { name: /cancel/i });
  fireEvent.click(cancelButton);
  // Check if the setIsModalEditTransactionOpen action is dispatched with false
});

// Additional tests can be added based on the specific functionality of the component
