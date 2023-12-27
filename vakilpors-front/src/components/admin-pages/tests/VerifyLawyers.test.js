import React from 'react';
import { render } from '@testing-library/react';
import VerifyLawyers from '../VerifyLawyers';

test('renders VerifyLawyers component with correct unverified lawyers count', () => {
    // Mock the useNavigate function
    const mockUseNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useNavigate: () => mockUseNavigate,
    }));

    // Mock the useAuth function
    jest.mock('../../../context/AuthProvider', () => ({
        useAuth: () => ({
            refUserRole: { current: 'Admin' },
            getAccessToken: jest.fn(),
        }),
    }));

    // Mock the axios.get function
    jest.mock('axios');
    const axios = require('axios');
    axios.get.mockResolvedValue({ data: { data: [] } });

    const { getByText } = render(<VerifyLawyers />);

    // Check if the unverified lawyers count is displayed correctly
    const unverifiedLawyersCountElement = getByText('لیست وکلای تایید نشده :');
    expect(unverifiedLawyersCountElement).toBeInTheDocument();
    expect(unverifiedLawyersCountElement.nextSibling.textContent).toBe('0'); // Adjust this based on your test data
});
