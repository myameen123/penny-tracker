import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Table } from './Table';

// Mock Data
const mockStatistics = {
  totalExpenses: 500,
  totalIncome: 1000,
  totalCategories: 3,
};

// Render Test - Data Provided
test('renders Table component with provided data', () => {
  render(<Table statistics={mockStatistics} />);
  expect(screen.getByTestId('table')).toBeInTheDocument();
  expect(screen.getByText('Category')).toBeInTheDocument();
  expect(screen.getByText('Amount')).toBeInTheDocument();
  // Assertions to check the presence of specific data like totalExpenses, totalIncome
});

// Render Test - No Data
test('does not render Table when no data is provided', () => {
  render(<Table statistics={null} />);
  expect(screen.queryByTestId('table')).toBeNull();
});

// Data Display Test
test('displays correct statistical data', () => {
  render(<Table statistics={mockStatistics} />);
  expect(screen.getByText('500')).toBeInTheDocument(); // totalExpenses
  expect(screen.getByText('1000')).toBeInTheDocument(); // totalIncome
  // Add more assertions for other statistical data
});

// Additional tests can be added based on the specific functionality of the component
