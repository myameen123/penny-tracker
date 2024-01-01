import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DropdownSelectMonth, DropdownSelectYear } from './DropdownSelect';

// Mock Props for DropdownSelectMonth
const mockMonthProps = {
  selectedYear: 2024,
  selectedMonth: 'January',
  onSelect: jest.fn(),
};

// Mock Props for DropdownSelectYear
const mockYearProps = {
  selectedYear: 2024,
  onSelect: jest.fn(),
};

// Render Test for DropdownSelectMonth
test('renders DropdownSelectMonth component without crashing', () => {
  render(<DropdownSelectMonth {...mockMonthProps} />);
  expect(screen.getByTestId('dropdown-select-month')).toBeInTheDocument();
});

// Render Test for DropdownSelectYear
test('renders DropdownSelectYear component without crashing', () => {
  render(<DropdownSelectYear {...mockYearProps} />);
  expect(screen.getByTestId('dropdown-select-year')).toBeInTheDocument();
});

// Interaction Test for DropdownSelectMonth
test('handles month selection correctly', () => {
  render(<DropdownSelectMonth {...mockMonthProps} />);
  const dropdown = screen.getByTestId('dropdown-select-month');
  fireEvent.change(dropdown, { target: { value: 'February' } });
  expect(mockMonthProps.onSelect).toHaveBeenCalledWith('February');
});

// Interaction Test for DropdownSelectYear
test('handles year selection correctly', () => {
  render(<DropdownSelectYear {...mockYearProps} />);
  const dropdown = screen.getByTestId('dropdown-select-year');
  fireEvent.change(dropdown, { target: { value: 2023 } });
  expect(mockYearProps.onSelect).toHaveBeenCalledWith(2023);
});

// Additional tests can be added based on the specific functionality of each component
