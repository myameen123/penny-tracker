import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Currency } from './Currency';
import { fetchCurrency } from '../../utils/currencyExchange';

// Mocking the fetchCurrency function
jest.mock('../../utils/currencyExchange', () => ({
  fetchCurrency: jest.fn(),
}));

// Mock currency data
const mockCurrencyData = [
  { id: 'usd', rate: 1.0 },
  { id: 'eur', rate: 0.9 },
  // Add more mock data as needed
];

// Setting up the test
beforeEach(() => {
  fetchCurrency.mockClear();
  fetchCurrency.mockResolvedValue(mockCurrencyData);
  localStorage.clear();
});

// Render Test
test('renders Currency component without crashing', async () => {
  await act(async () => {
    render(<Currency />);
  });
  expect(screen.getByTestId('currency-container')).toBeInTheDocument();
});

// API Call Test
test('calls fetchCurrency and updates state with fetched data', async () => {
  await act(async () => {
    render(<Currency />);
  });
  expect(fetchCurrency).toHaveBeenCalled();
  expect(screen.getByText('1.0')).toBeInTheDocument(); // Checking if the mock data is rendered
  // Add more assertions for other currencies
});

// Local Storage Test
test('uses cached data from local storage if available', async () => {
  localStorage.setItem('currencyData', JSON.stringify(mockCurrencyData));
  await act(async () => {
    render(<Currency />);
  });
  expect(fetchCurrency).not.toHaveBeenCalled();
  expect(screen.getByText('1.0')).toBeInTheDocument(); // Checking if the cached data is used
});

// Additional tests can be added based on the specific functionality of the component
