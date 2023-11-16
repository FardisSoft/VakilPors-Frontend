import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const mockAxios = new MockAdapter(axios);

const mockLawyer = {
    // your mock lawyer data here
};

const mockLawyers = [mockLawyer];

mockAxios.onGet(`${BASE_API_ROUTE}Lawyer/GetAll`).reply(200, {
    data: mockLawyers,
});

describe('App component', () => {
    it('renders the App component with lawyer information and advertising', async () => {
        render(
            <Router>
                <App />
            </Router>
        );

        // Add your assertions based on the rendered content
        expect(screen.getByText(mockLawyer.user.name)).toBeInTheDocument();
        expect(screen.getByText(`عنوان: ${mockLawyer.title ? mockLawyer.title : "وکیل"}`)).toBeInTheDocument();

        // Add more assertions as needed
    });

    it('navigates to Lawyer-search-page when "جست و جوی وکلا" button is clicked', async () => {
        const { getByText } = render(
            <Router>
                <App />
            </Router>
        );

        // Simulate a button click
        userEvent.click(getByText('جست و جوی وکلا'));

        // Add assertions for navigation, for example, check the URL
        await waitFor(() => expect(window.location.pathname).toBe('/Lawyer-search-page'));
    });
});
