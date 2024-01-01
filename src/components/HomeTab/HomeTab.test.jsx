import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../redux/rootReducer'; // Update this import based on your project structure
import HomeTab from './HomeTab';

// Creating a mock store with initial state
const mockInitialState = {
  session: {
    user: { id: 'user1', name: 'John Doe' }, // Example user data
  },
  finance: {
    transactions: [{ id: 'tx1', amount: 100, description: 'Groceries' }], // Example transactions data
  },
};
const mockStore = createStore(rootReducer, mockInitialState);

// Mocking useDispatch and useSelector from react-redux
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
  useSelector: () => jest.fn((selector) => selector(mockInitialState)),
}));

// Utility function for rendering with Redux store
const renderWithStore = (component) => render(
  <Provider store={mockStore}>
    {component}
  </Provider>
);

// Render Test
test('renders HomeTab component without crashing', () => {
  renderWithStore(<HomeTab />);
  expect(screen.getByTestId('home-tab')).toBeInTheDocument();
});

// Transactions Display Test
test('displays transactions correctly', () => {
  renderWithStore(<HomeTab />);
  expect(screen.getByText('Groceries')).toBeInTheDocument();
  expect(screen.getByText('$100')).toBeInTheDocument();
});

// Transaction Deletion Test
test('handles transaction deletion', () => {
  renderWithStore(<HomeTab />);
  const deleteButton = screen.getByTestId('delete-transaction-button');
  fireEvent.click(deleteButton);
  // Check if the deleteTransaction action is dispatched
  // This will depend on your Redux setup and the component's implementation
});

// Modal Interaction Test
test('handles modal interactions', () => {
  renderWithStore(<HomeTab />);
  const editButton = screen.getByTestId('edit-transaction-button');
  fireEvent.click(editButton);
  // Check if the setIsModalEditTransactionOpen action is dispatched
  // This will depend on your Redux setup and the component's implementation
});

// Additional tests can be added based on the specific functionality of the component
