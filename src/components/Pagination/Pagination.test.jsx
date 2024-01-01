import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './Pagination';

// Mock Props
const mockProps = {
    currentPage: 1,
    totalPages: 5,
    onPageChange: jest.fn(),
};

// Render Test
test('renders Pagination without crashing', () => {
    render(<Pagination {...mockProps} />);
    expect(screen.getByTestId('pagination-container')).toBeInTheDocument();
});

// Page Button Click Test
test('navigates to the correct page on button click', () => {
    render(<Pagination {...mockProps} />);
    const pageTwoButton = screen.getByText('2');
    fireEvent.click(pageTwoButton);
    expect(mockProps.onPageChange).toHaveBeenCalledWith(2);
});

// Current Page Highlight Test
test('highlights the current page correctly', () => {
    render(<Pagination {...mockProps} />);
    const currentPageButton = screen.getByText(mockProps.currentPage.toString());
    expect(currentPageButton).toHaveClass('current-page-class'); // Replace 'current-page-class' with your actual class for the current page
});

// Boundary Page Navigation Test
test('disables previous button on first page and next button on last page', () => {
    // Test for first page
    render(<Pagination {...mockProps} currentPage={1} />);
    expect(screen.getByText('Previous')).toBeDisabled();

    // Test for last page
    render(<Pagination {...mockProps} currentPage={mockProps.totalPages} />);
    expect(screen.getByText('Next')).toBeDisabled();
});

// Additional tests can be added based on the specific functionality of the component
