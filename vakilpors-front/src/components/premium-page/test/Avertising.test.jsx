import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Advertising from '../Avertising';

const mockLawyer = {
    // your mock lawyer data here
};

const mockLawyers = [mockLawyer];

describe('Advertising component', () => {
    it('displays lawyer information when data is loaded', async () => {
        render(
            <Router>
                <Advertising lawyers={mockLawyers} />
            </Router>
        );

        expect(screen.getByText(mockLawyers[0].user.name)).toBeInTheDocument();
        expect(screen.getByText(`عنوان: ${mockLawyers[0].title ? mockLawyers[0].title : "وکیل"}`)).toBeInTheDocument();
        expect(screen.getByText(`شهر: ${mockLawyers[0].city ? mockLawyers[0].city : "نامشخص"}`)).toBeInTheDocument();
    });
});
