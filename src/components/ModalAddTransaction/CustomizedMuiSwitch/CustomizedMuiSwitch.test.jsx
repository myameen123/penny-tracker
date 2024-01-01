import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CustomizedMuiSwitch } from './CustomizedMuiSwitch';

// Mock Props
const mockProps = {
  checked: false,
  onChange: jest.fn(),
};

// Render Test
test('renders CustomizedMuiSwitch component without crashing', () => {
  render(<CustomizedMuiSwitch {...mockProps} />);
  expect(screen.getByTestId('customized-mui-switch')).toBeInTheDocument();
});

// Switch State Change Test
test('changes state on switch toggle', () => {
  render(<CustomizedMuiSwitch {...mockProps} />);
  const switchControl = screen.getByRole('checkbox');
  fireEvent.click(switchControl);
  expect(mockProps.onChange).toHaveBeenCalled();
  // Additional assertions can be made to check the state of the switch
});

// Prop Handling Test
test('handles props correctly', () => {
  render(<CustomizedMuiSwitch checked={true} onChange={mockProps.onChange} />);
  const switchControl = screen.getByRole('checkbox');
  expect(switchControl).toBeChecked();
});

// Additional tests can be added based on the specific functionality of the component
