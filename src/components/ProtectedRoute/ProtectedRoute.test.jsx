import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

// Mocking the useAuth hook
jest.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    isAuth: false,
    isRefreshing: false,
  }),
}));

// Utility function for rendering with router
const renderWithRouter = (isAuth, isRefreshing, component) => render(
  <MemoryRouter initialEntries={['/protected']}>
    <Routes>
      <Route path="/protected" element={
        <ProtectedRoute 
          component={component} 
          redirectTo="/login"
          useAuth={() => ({ isAuth, isRefreshing })}
        />
      } />
    </Routes>
  </MemoryRouter>
);

// Mock Component for testing
const MockComponent = () => <div>Protected Content</div>;

// Render Test - Not Authenticated
test('redirects to login when not authenticated', () => {
  renderWithRouter(false, false, <MockComponent />);
  expect(screen.queryByText('Protected Content')).toBeNull();
  expect(window.location.pathname).toBe('/login');
});

// Render Test - Authenticated
test('renders the component when authenticated', () => {
  renderWithRouter(true, false, <MockComponent />);
  expect(screen.getByText('Protected Content')).toBeInTheDocument();
});

// Render Test - Refreshing
test('does not redirect while refreshing', () => {
  renderWithRouter(false, true, <MockComponent />);
  expect(screen.queryByText('Protected Content')).toBeNull();
  // Assert that it does not redirect while isRefreshing is true
});

// Additional tests can be added based on the specific functionality of the component
