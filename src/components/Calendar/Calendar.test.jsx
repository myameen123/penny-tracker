import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calendar from './Calendar';

// Mock Props
const mockProps = {
    transactionType: 'income', // or 'expense'
    addTransactionDate: new Date(),
    editTransactionDate: new Date(),
    onChange: jest.fn(),
};

// Render Test
test('renders Calendar component without crashing', () => {
    render(<Calendar {...mockProps} />);
    expect(screen.getByTestId('calendar-container')).toBeInTheDocument();
});

// Prop Handling Test
test('applies correct class based on transaction type', () => {
    const { rerender } = render(<Calendar {...mockProps} transactionType="income" />);
    expect(screen.getByTestId('calendar-container')).toHaveClass('income');

    rerender(<Calendar {...mockProps} transactionType="expense" />);
    expect(screen.getByTestId('calendar-container')).not.toHaveClass('income');
});

// Date Change Test
test('calls onChange when date is selected', () => {
    render(<Calendar {...mockProps} />);
    const dateInput = screen.getByRole('textbox');
    fireEvent.change(dateInput, { target: { value: '2024-01-01' } });
    expect(mockProps.onChange).toHaveBeenCalled();
});

// Additional tests can be added based on the specific functionality of the component
