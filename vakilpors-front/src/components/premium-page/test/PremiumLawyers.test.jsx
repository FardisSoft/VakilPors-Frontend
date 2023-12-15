import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import PremiumLawyers from './PremiumLawyers';

jest.mock('axios');

describe('PremiumLawyers Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(<PremiumLawyers />);
    });

    it('activates subscription on button click', async () => {
        axios.post.mockResolvedValue({ data: { /* your response data here */ } });

        const { getByText } = render(<PremiumLawyers />);

        fireEvent.click(getByText('انتخاب'));

        await waitFor(() => expect(axios.post).toHaveBeenCalled());
        // You can add assertions here based on the expected behavior after a successful activation
    });

    it('handles subscription activation error', async () => {
        axios.post.mockRejectedValue(new Error('Activation failed'));

        const { getByText } = render(<PremiumLawyers />);

        fireEvent.click(getByText('انتخاب'));

        await waitFor(() => expect(axios.post).toHaveBeenCalled());
        // You can add assertions here based on the expected behavior after an activation error
    });

    it('displays loading spinner during activation', async () => {
        axios.post.mockResolvedValue({ data: { /* your response data here */ } });

        const { getByText, getByTestId } = render(<PremiumLawyers />);

        fireEvent.click(getByText('انتخاب'));

        expect(getByTestId('loading-spinner')).toBeInTheDocument();

        await waitFor(() => expect(axios.post).toHaveBeenCalled());

        // You can add assertions here based on the expected behavior after activation
        expect(getByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    it('redirects on successful activation', async () => {
        axios.post.mockResolvedValue({ data: { /* your response data here */ } });

        const { getByText, findByTestId } = render(<PremiumLawyers />);

        fireEvent.click(getByText('انتخاب'));

        await waitFor(() => expect(axios.post).toHaveBeenCalled());

        // Assuming your navigation logic sets a data-testid on the redirected element
        const redirectedElement = await findByTestId('redirected-element');
        expect(redirectedElement).toBeInTheDocument();
    });

    // Add more tests as needed for different scenarios and edge cases
});
