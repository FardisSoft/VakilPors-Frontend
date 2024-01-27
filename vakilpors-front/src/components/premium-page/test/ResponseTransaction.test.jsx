import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ResponseTransaction from '../ResponseTransaction';
import { createTheme, ThemeProvider } from '@mui/material/styles';

describe('ResponseTransaction', () => {
    it('renders without crashing', () => {
        const { getByText } = render(
            <Router>
                <ResponseTransaction />
            </Router>
        );
        // expect(getByText('کیف پول')).toBeInTheDocument();
    });
});
