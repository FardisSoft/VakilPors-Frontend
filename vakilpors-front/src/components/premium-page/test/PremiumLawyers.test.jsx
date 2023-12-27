import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import VerifyLawyers from '../VerifyLawyers';

jest.mock('axios');
jest.mock('../../../context/AuthProvider', () => ({
    useAuth: () => ({
        refUserRole: { current: 'Admin' },
        getAccessToken: () => Promise.resolve('fake_token'),
    }),
}));

describe('VerifyLawyers', () => {
    it('renders UsersCard for each unverified lawyer', async () => {
        // Mock the axios.get function
        axios.get.mockResolvedValue({
            data: {
                data: [
                    { isVerified: false, user: { name: 'Lawyer1' } },
                    { isVerified: true, user: { name: 'Lawyer2' } },
                    { isVerified: false, user: { name: 'Lawyer3' } },
                ]
            }
        });

        render(
            <Router>
                <VerifyLawyers />
            </Router>
        );

        // Wait for effects to run
        await waitFor(() => {
            expect(screen.getByText('Lawyer1')).toBeInTheDocument();
            expect(screen.queryByText('Lawyer2')).not.toBeInTheDocument();
            expect(screen.getByText('Lawyer3')).toBeInTheDocument();
        });
    });
});
