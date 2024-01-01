import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Loader } from './Loader';

// Render Test
test('renders Loader component without crashing', () => {
  render(<Loader />);
  expect(screen.getByTestId('loader')).toBeInTheDocument();
});

// Loading Animation Display Test
test('displays loading animation', () => {
  render(<Loader />);
  const circles = screen.getAllByTestId('loader-circle');
  expect(circles.length).toBeGreaterThan(0); // Checking if there are animated circles present
  circles.forEach(circle => {
    expect(circle).toHaveClass('Loader__Circle'); // Replace 'Loader__Circle' with the actual class used for animation
  });
});

// Additional tests can be added based on the specific functionality of the component
