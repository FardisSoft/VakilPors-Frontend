import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Advertising from '../Avertising';
// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('Advertising Component', () => {
    // Mock data for testing
    const mockLawyers = [
        {
            id: 1,
            user: {
                name: 'John Doe',
            },
            title: 'Lawyer',
            aboutMe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            profileImageUrl: 'url/to/image',
        },
        // Add more lawyer objects as needed
    ];

    it('renders without crashing', () => {
        render(<Advertising lawyers={mockLawyers} />);
        // Check if the component renders without crashing
        expect(screen.getByText('وکیل های کار درست ما')).toBeInTheDocument();
    });

    it('displays loading spinner when data is loading', () => {
        render(<Advertising lawyers={[]} />);
        // Check if the loading spinner is displayed
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    it('displays lawyer information when data is loaded', () => {
        render(<Advertising lawyers={mockLawyers} />);
        // Check if the lawyer information is displayed
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('عنوان: Lawyer')).toBeInTheDocument();
        expect(screen.getByText(/Lorem ipsum dolor/)).toBeInTheDocument();
    });

    it('handles button click to view lawyer profile', () => {
        render(<Advertising lawyers={mockLawyers} />);
        // Mock the useNavigate function
        const mockNavigate = jest.fn();
        require('react-router-dom').useNavigate.mockImplementation(() => mockNavigate);

        // Click the "مشاهده پروفایل" button
        userEvent.click(screen.getByText('مشاهده پروفایل'));

        // Check if the useNavigate function is called with the correct path
        expect(mockNavigate).toHaveBeenCalledWith('/LawyerPage/1'); // Adjust the path and ID accordingly
    });

    // Add more test cases as needed
});
