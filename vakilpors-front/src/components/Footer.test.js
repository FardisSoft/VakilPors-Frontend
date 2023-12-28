import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer'; // adjust this import to your file structure

describe('Footer', () => {
    it('renders without crashing', () => {
        const { getByText } = render(<Footer />);
        expect(getByText('Fardis Soft')).toBeInTheDocument();
    });
});
