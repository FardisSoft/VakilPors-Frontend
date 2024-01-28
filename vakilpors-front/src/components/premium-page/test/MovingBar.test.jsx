import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MovingTextComponent from "../MovingBar";

describe('MovingTextComponent', () => {
    it('renders without crashing', () => {
        render(<Router><MovingTextComponent /></Router>);
        // expect(screen.getByText('استفاده از برنامه هفتگی پریمیوم به شما این امکان را می‌دهد که به طور مداوم با مشتریان جدید ارتباط برقرار کنید. با قیمت مقرون به صرفه ، کسب و کار شما در نتایج جستجو و بخش‌های پیشنهادی بیشتر به چشم می‌خورد.')).toBeInTheDocument();
    });

    // it('contains a link to /PremiumLawyers', () => {
    //     render(<Router><MovingTextComponent /></Router>);
    //     expect(screen.getByRole('link')).toHaveAttribute('href', '/PremiumLawyers');
    // });

    // it('changes background color over time', () => {
    //     jest.useFakeTimers();
    //     render(<Router><MovingTextComponent /></Router>);
    //     const initialColor = screen.getByRole('link').parentElement.style.backgroundColor;
    //     jest.advanceTimersByTime(2000);
    //     const newColor = screen.getByRole('link').parentElement.style.backgroundColor;
    //     expect(initialColor).not.toEqual(newColor);
    //     jest.useRealTimers();
    // });
});
