// Import React Testing Library and Jest
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';

// Import the component to be tested
import PremiumLawyers from '../PremiumLawyers';

// Mock the implementation of the Button component
jest.mock('@material-ui/core/Button', () => {
    return ({ children, onClick }) => (
        <button onClick={onClick}>{children}</button>
    );
});

// Write a test suite for the component
describe('PremiumLawyers component', () => {
    // Write a test case for rendering the component
    test('renders the component with header and plans', () => {
        // Render the component
        render(<PremiumLawyers />);

        // Assert that the header elements are present
        expect(screen.getByText('رشد کسب و کار خود را با تبلیغات هدفمند آنلاین افزایش دهید')).toBeInTheDocument();
        expect(screen.getByText('بین برنامه های روزانه یا هفتگی انتخاب کنید تا با مشتریان جدید ارتباط برقرار کنید.')).toBeInTheDocument();

        // Assert that the plan cards are present
        expect(screen.getByText('برنامه روزانه')).toBeInTheDocument();
        expect(screen.getByText('برنامه هفتگی')).toBeInTheDocument();

        // Assert that the plan features are present
        expect(screen.getByText('قرار دادن لیست ویژه')).toBeInTheDocument();
        expect(screen.getByText('نمایش تبلیغات در صفحات با ترافیک بالا')).toBeInTheDocument();
        expect(screen.getByText('گزارش تحلیلی از کلیک ها و تاثیرات')).toBeInTheDocument();
        expect(screen.getByText('خلاقیت های سفارشی برای تبلیغات موثر')).toBeInTheDocument();
    });

    // Write a test case for selecting a plan
    test('selects a plan and shows a confirmation message', () => {
        // Render the component
        render(<PremiumLawyers />);

        // Find the button for the daily plan
        const dailyPlanButton = screen.getByText('انتخاب', { selector: 'button' });

        // Click the button
        fireEvent.click(dailyPlanButton);

        // Assert that a confirmation message is shown
        expect(screen.getByText('شما برنامه روزانه را انتخاب کرده اید. لطفا اطلاعات پرداخت خود را وارد کنید.')).toBeInTheDocument();
    });
});
