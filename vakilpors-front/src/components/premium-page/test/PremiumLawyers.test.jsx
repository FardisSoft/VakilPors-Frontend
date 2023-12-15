// PremiumLawyers.test.js

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import PremiumLawyers, { PlanCard } from '../PremiumLawyers';

jest.mock('axios');

// Render Test
test('renders PremiumLawyers component', () => {
    render(<PremiumLawyers />);
});

// PlanCard Rendering Test
const samplePlan = {
    name: 'Sample Plan',
    price: '$20',
    period: 'Monthly',
    description: 'Sample description',
    commonFeatures: ['Feature 1', 'Feature 2'],
    planType: 'sample',
};

test('renders PlanCard component', () => {
    render(<PlanCard plan={samplePlan} onSelectPlan={() => {}} loading={false} />);
});

// Activate Subscription Function Test
test('activates subscription on button click', async () => {
    axios.post.mockResolvedValue({ data: 'Subscription activated' });

    const { getByText } = render(<PremiumLawyers />);

    fireEvent.click(getByText('انتخاب'));

    await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
            'your_expected_activation_endpoint',
            '',
            expect.any(Object)
        );
        // assert other expectations based on your implementation
    });
});

// Loading State Test
test('displays loading state during subscription activation', async () => {
    axios.post.mockResolvedValue({ data: 'Subscription activated' });

    const { getByText, getByTestId } = render(<PremiumLawyers />);

    fireEvent.click(getByText('انتخاب'));

    await waitFor(() => {
        expect(getByTestId('loading-spinner')).toBeInTheDocument();
    });
});
