import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Navigation } from './Navigation';

// Utility function for rendering with router
const renderWithRouter = (component) => render(
  <MemoryRouter>
    {component}
  </MemoryRouter>
);

// Render Test
test('renders Navigation component without crashing', () => {
  renderWithRouter(<Navigation />);
  expect(screen.getByTestId('navigation')).toBeInTheDocument();
});

// Navigation Items Display Test
test('displays correct navigation items', () => {
  renderWithRouter(<Navigation />);
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Statistics')).toBeInTheDocument();
  // Add more assertions for other navigation items
});

// Responsiveness Test
test('changes navigation items based on screen width', () => {
  // Render with a mock screen width
  renderWithRouter(<Navigation />);
  // Assert the presence or absence of certain navigation items based on screen width
  // Example: expect(screen.queryByText('Currency')).toBeNull(); for wider screens
});

// Navigation Link Functionality Test
test('navigates to correct path on link click', () => {
  renderWithRouter(<Navigation />);
  const homeLink = screen.getByText('Home');
  expect(homeLink.closest('a')).toHaveAttribute('href', '/');
  // Add more assertions for other navigation links
});

// Additional tests can be added based on the specific functionality of the component
