import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../redux/rootReducer'; // Update this import based on your project structure
import LoginForm from './LoginForm';

// Creating a mock store
const mockStore = createStore(rootReducer);

// Utility function for rendering with Redux store
const renderWithStore = (component) => render(
  <Provider store={mockStore}>
    {component}
  </Provider>
);

// Render Test
test('renders LoginForm component without crashing', () => {
  renderWithStore(<LoginForm />);
  expect(screen.getByTestId('login-form')).toBeInTheDocument();
});

// Form Fields Test
test('contains email and password input fields', () => {
  renderWithStore(<LoginForm />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

// Form Submission Test
test('submits the form with email and password', () => {
  renderWithStore(<LoginForm />);
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /log in/i }));
  // Check if the login action is dispatched
  // This will depend on your Redux setup and the component's implementation
});

// Form Validation Test
test('displays error messages for invalid input', () => {
  renderWithStore(<LoginForm />);
  fireEvent.click(screen.getByRole('button', { name: /log in/i }));
  expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  // Add more assertions for other validation messages
});

// Additional tests can be added based on the specific functionality of the component
