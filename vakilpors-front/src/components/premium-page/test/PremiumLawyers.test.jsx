import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import PremiumLawyers from '../PremiumLawyers';

jest.mock('axios');
jest.mock('../../../context/AuthProvider', () => ({
    useAuth: () => ({
        refUserRole: { current: 'lawyer' },
        getAccessToken: () => 'fake_token',
    }),
}));

describe('PremiumLawyers', () => {
    beforeEach(() => {
        axios.post.mockResolvedValue({ data: {} });
    });

    it('renders without crashing', () => {
        render(<Router><PremiumLawyers /></Router>);
        expect(screen.getByText('برنامه روزانه')).toBeInTheDocument();
        expect(screen.getByText('برنامه هفتگی')).toBeInTheDocument();
    });

    it('activates a subscription when a plan is selected', async () => {
        render(<Router><PremiumLawyers /></Router>);
        fireEvent.click(screen.getAllByText('انتخاب')[0]);
        await waitFor(() => expect(axios.post).toHaveBeenCalled());
    });

    it('displays a loading spinner while activating a subscription', () => {
        render(<Router><PremiumLawyers /></Router>);
        fireEvent.click(screen.getAllByText('انتخاب')[0]);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('displays an error message if activating a subscription fails', async () => {
        axios.post.mockRejectedValue(new Error('Network error'));
        render(<Router><PremiumLawyers /></Router>);
        fireEvent.click(screen.getAllByText('انتخاب')[0]);
        await waitFor(() => expect(screen.getByText('خطا در فعال سازی اشتراک')).toBeInTheDocument());
    });
});
