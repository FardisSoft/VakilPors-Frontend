import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Workinfo from './Workinfo'; // adjust this import to your file structure

describe('Workinfo', () => {
    it('renders without crashing', () => {
        const { getByText } = render(
            <Router>
                <Workinfo />
            </Router>
        );
        expect(getByText('خدمات وکیل پرس')).toBeInTheDocument();
        expect(getByText('دعاوی حقوقی')).toBeInTheDocument();
        expect(getByText('دعاوی خانواده')).toBeInTheDocument();
        expect(getByText('دعاوی ملکی')).toBeInTheDocument();
        expect(getByText('دعاوی کیفری')).toBeInTheDocument();
        expect(getByText('خدمات ثبتی و شرکتی')).toBeInTheDocument();
    });
});
