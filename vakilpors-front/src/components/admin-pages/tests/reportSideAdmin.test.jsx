import React from 'react';
import { render, screen } from '@testing-library/react';
import ReportSideAdmin from '../reportSideAdmin';

test('renders ReportSideAdmin', () => {
    render(<ReportSideAdmin />);
    const linkElement = screen.getByText(/لیست تخلفات ثبت شده :/i);
    expect(linkElement).toBeInTheDocument();
});
