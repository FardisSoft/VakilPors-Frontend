import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Advertising from '../Avertising';

const mockLawyers = [
    {
        id: 1,
        user: { name: 'John Doe' },
        title: 'Senior Lawyer',
        licenseNumber: 'ABC123',
        aboutMe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        profileImageUrl: 'mock_image_url',
        rating: 4,
    },
    // Add more mock lawyers as needed
];

describe('Advertising component', () => {
    it('displays loading state initially', async () => {
        render(
            <Router>
                <Advertising lawyers={[]} />
            </Router>
        );

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /بیشتر/i })).not.toBeInTheDocument();
    });

    it('displays lawyer information when data is loaded', async () => {
        render(
            <Router>
                <Advertising lawyers={mockLawyers} />
            </Router>
        );

        await screen.findByText(mockLawyers[0].user.name); // Wait for the data to be loaded

        // Assertions for LawyerCard component
        expect(screen.getByAltText(mockLawyers[0].user.name)).toBeInTheDocument();
        expect(screen.getByText(mockLawyers[0].user.name)).toBeInTheDocument();
        expect(screen.getByText(`عنوان: ${mockLawyers[0].title}`)).toBeInTheDocument();
        expect(screen.getByText(`شماره پرونده وکالت: ${mockLawyers[0].licenseNumber}`)).toBeInTheDocument();
        expect(screen.getByText(`توضیحات: ${mockLawyers[0].aboutMe.split(' ').slice(0, 30).join(' ')}...`)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /بیشتر/i })).toHaveAttribute('href', `/LawyerPage/${mockLawyers[0].id}`);
        expect(screen.getByLabelText('Rated')).toHaveValue(mockLawyers[0].rating);
    });

    it('cycles through lawyers with button clicks', async () => {
        render(
            <Router>
                <Advertising lawyers={mockLawyers} />
            </Router>
        );

        await screen.findByText(mockLawyers[0].user.name); // Wait for the data to be loaded

        // Initial display
        expect(screen.getByText(mockLawyers[0].user.name)).toBeInTheDocument();
        expect(screen.getByText(mockLawyers[0].title)).toBeInTheDocument();

        // Click next button
        fireEvent.click(screen.getByRole('button', { name: /•/ }));
        await screen.findByText(mockLawyers[1].user.name);

        // Check if the next lawyer is displayed
        expect(screen.getByText(mockLawyers[1].user.name)).toBeInTheDocument();
        expect(screen.getByText(mockLawyers[1].title)).toBeInTheDocument();

        // Click previous button
        fireEvent.click(screen.getByRole('button', { name: /•/ }));
        await screen.findByText(mockLawyers[0].user.name);

        // Check if it cycles back to the initial lawyer
        expect(screen.getByText(mockLawyers[0].user.name)).toBeInTheDocument();
        expect(screen.getByText(mockLawyers[0].title)).toBeInTheDocument();
    });
});
