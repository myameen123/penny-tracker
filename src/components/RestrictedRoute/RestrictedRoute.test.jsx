import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { RestrictedRoute } from './RestrictedRoute';

// Mocking the useAuth hook
jest.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    isAuth: false,
  }),
}));

// Utility function for rendering with router
const renderWithRouter = (isAuth, component) => render(
  <MemoryRouter initialEntries={['/restricted']}>
    <Routes>
      <Route path="/restricted" element={
        <RestrictedRoute 
          component={component} 
          redirectTo="/dashboard"
          useAuth={() => ({ isAuth })}
        />
      } />
    </Routes>
  </MemoryRouter>
);

// Mock Component for testing
const MockComponent = () => <div>Restricted Content</div>;

// Render Test - Not Authenticated
test('renders the component when not authenticated', () => {
  renderWithRouter(false, <MockComponent />);
  expect(screen.getByText('Restricted Content')).toBeInTheDocument();
});

// Render Test - Authenticated
test('redirects to dashboard when authenticated', () => {
  renderWithRouter(true, <MockComponent />);
  expect(screen.queryByText('Restricted Content')).toBeNull();
  expect(window.location.pathname).toBe('/dashboard');
});

// Additional tests can be added based on the specific functionality of the component
