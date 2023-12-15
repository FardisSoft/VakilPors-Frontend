import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import PremiumLawyers from '../PremiumLawyers';

// Mocking axios post method for activating a subscription
jest.mock('axios');

describe('PremiumLawyers Component', () => {
    // Mocking useAuth hook
    jest.mock('../../context/AuthProvider', () => ({
        useAuth: () => ({
            refUserRole: { current: 'User' },
            getAccessToken: jest.fn(() => 'mockedAccessToken'),
        }),
    }));

    // Mocking toast.success and toast.error functions from react-toastify
    jest.mock('react-toastify', () => ({
        toast: {
            success: jest.fn(),
            error: jest.fn(),
        },
    }));

    it('renders without crashing', () => {
        render(<PremiumLawyers />);
    });

    it('displays header text', () => {
        const { getByText } = render(<PremiumLawyers />);
        expect(getByText('رشد کسب و کار خود را با تبلیغات هدفمند آنلاین افزایش دهید')).toBeInTheDocument();
        expect(getByText('بین برنامه های روزانه یا هفتگی انتخاب کنید تا با مشتریان جدید ارتباط برقرار کنید.')).toBeInTheDocument();
        expect(getByText('هر روز با مشتریان محلی در تماس باشید.')).toBeInTheDocument();
    });

    // Add more tests for different parts of the PremiumLawyers component

    describe('PlanCard Component', () => {
        it('renders without crashing', () => {
            const plan = {
                name: 'برنامه روزانه',
                price: '$10',
                period: 'در روز',
                description: 'Description of the plan.',
                commonFeatures: ['Feature 1', 'Feature 2'],
                planType: 'silver',
            };
            render(<PlanCard plan={plan} onSelectPlan={() => { }} loading={false} />);
        });

        it('displays plan details correctly', () => {
            const plan = {
                name: 'برنامه روزانه',
                price: '$10',
                period: 'در روز',
                description: 'Description of the plan.',
                commonFeatures: ['Feature 1', 'Feature 2'],
                planType: 'silver',
            };
            const { getByText } = render(<PlanCard plan={plan} onSelectPlan={() => { }} loading={false} />);

            expect(getByText('برنامه روزانه')).toBeInTheDocument();
            expect(getByText('$10')).toBeInTheDocument();
            expect(getByText('در روز')).toBeInTheDocument();
            expect(getByText('Description of the plan.')).toBeInTheDocument();
            expect(getByText('Feature 1')).toBeInTheDocument();
            expect(getByText('Feature 2')).toBeInTheDocument();
        });

        it('calls onSelectPlan when the button is clicked', () => {
            const plan = {
                name: 'برنامه روزانه',
                price: '$10',
                period: 'در روز',
                description: 'Description of the plan.',
                commonFeatures: ['Feature 1', 'Feature 2'],
                planType: 'silver',
            };
            const onSelectPlanMock = jest.fn();
            const { getByText } = render(<PlanCard plan={plan} onSelectPlan={onSelectPlanMock} loading={false} />);

            fireEvent.click(getByText('انتخاب'));

            expect(onSelectPlanMock).toHaveBeenCalledTimes(1);
        });

        it('disables the button when loading is true', () => {
            const plan = {
                name: 'برنامه روزانه',
                price: '$10',
                period: 'در روز',
                description: 'Description of the plan.',
                commonFeatures: ['Feature 1', 'Feature 2'],
                planType: 'silver',
            };
            const { getByText } = render(<PlanCard plan={plan} onSelectPlan={() => { }} loading={true} />);

            const button = getByText('انتخاب');
            expect(button).toBeDisabled();
        });
    });
});
