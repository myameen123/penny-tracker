import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import RegisterForm from './RegisterForm';
import rootReducer from '../../redux/rootReducer'; // Assuming rootReducer is the combined reducer

// Mock store for testing
const store = createStore(rootReducer);

// Utility function to render component with necessary providers
const renderWithProviders = (component) => (
  render(
    <Provider store={store}>
      <MemoryRouter>
        {component}
      </MemoryRouter>
    </Provider>
  )
);

// Render Test
test('renders RegisterForm without crashing', () => {
  renderWithProviders(<RegisterForm />);
  expect(screen.getByRole('form')).toBeInTheDocument();
});

// Form Fields Test
test('contains necessary input fields', () => {
  renderWithProviders(<RegisterForm />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  // Add more assertions for other fields
});

// Form Submission Test
test('handles form submission', () => {
  renderWithProviders(<RegisterForm />);
  const submitButton = screen.getByRole('button', { name: /register/i });
  fireEvent.click(submitButton);
  // Mock form submission and assert the submitted data
  // This part of the test depends on how the form submission is handled in your application
});
