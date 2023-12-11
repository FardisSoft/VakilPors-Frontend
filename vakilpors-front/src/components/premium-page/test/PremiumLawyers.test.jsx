import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlanCard from '../PremiumLawyers';

const samplePlan = {
    name: 'برنامه روزانه',
    price: '$10',
    period: 'در روز',
    description: 'توضیحات برنامه روزانه',
    commonFeatures: ['ویژگی 1', 'ویژگی 2'],
};

test('renders plan card correctly', () => {
    render(<PlanCard plan={samplePlan} commonFeatures={samplePlan.commonFeatures} />);

    // Check if the plan name, price, and period are rendered
    expect(screen.getByText(samplePlan.name)).toBeInTheDocument();
    expect(screen.getByText(samplePlan.price)).toBeInTheDocument();
    expect(screen.getByText(samplePlan.period)).toBeInTheDocument();

    // Check if the description is rendered
    expect(screen.getByText(samplePlan.description)).toBeInTheDocument();

    // Check if common features are rendered
    samplePlan.commonFeatures.forEach((feature) => {
        expect(screen.getByText(feature)).toBeInTheDocument();
    });

    // Check if the "انتخاب" button is rendered
    const selectButton = screen.getByText('انتخاب');
    expect(selectButton).toBeInTheDocument();

    // Simulate a user clicking the "انتخاب" button
    userEvent.click(selectButton);

    // Check if the button click triggers the expected behavior (you can extend this based on your actual functionality)
    // For example, check if a function that handles the selection is called or if a modal is displayed.
    // For simplicity, I'll just check if the button click changes its text to "Selected".
    expect(screen.getByText('Selected')).toBeInTheDocument();
});
