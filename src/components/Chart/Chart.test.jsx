import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chart from './Chart';
import { Doughnut } from 'react-chartjs-2';

// Mock Props
const mockProps = {
    arrColors: ['#FF6384', '#36A2EB', '#FFCE56'], // Example color array
    arrMoney: [300, 200, 500], // Example money array
    consumption: 1000, // Example consumption value
};

// Mocking Doughnut chart from react-chartjs-2
jest.mock('react-chartjs-2', () => ({
    Doughnut: () => <canvas data-testid="doughnut-chart"></canvas>,
}));

// Render Test
test('renders Chart component without crashing', () => {
    render(<Chart {...mockProps} />);
    expect(screen.getByTestId('chart-container')).toBeInTheDocument();
    expect(screen.getByTestId('doughnut-chart')).toBeInTheDocument();
    expect(screen.getByText('Statistics')).toBeInTheDocument();
});

// Chart Data Test
test('configures Doughnut chart with correct data', () => {
    render(<Chart {...mockProps} />);
    // Test if the Doughnut chart receives the correct props
    // This may involve checking the data prop of the Doughnut component
});

// Balance Component Test
test('includes Balance component with correct props', () => {
    render(<Chart {...mockProps} />);
    expect(screen.getByTestId('balance-component')).toBeInTheDocument();
    // Further assertions can be made based on the props passed to the Balance component
});

// Additional tests can be added based on the specific functionality of the component
