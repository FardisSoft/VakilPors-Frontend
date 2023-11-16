import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter as Router } from 'react-router-dom';
import Advertising from './path-to-Advertising-component';

const mockAxios = new MockAdapter(axios);

const mockLawyer = {
    // your mock lawyer data here
};

const mockLawyers = [mockLawyer];

mockAxios.onGet(`${BASE_API_ROUTE}Lawyer/GetAll`).reply(200, {
    data: mockLawyers,
});

describe('Advertising component', () => {
    it('displays loading spinner while data is loading', async () => {
        render(
            <Router>
                <Advertising lawyers={[]} />
            </Router>
        );

        // Check if the loading spinner is displayed
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        // You may add more assertions related to the loading state
    });

    it('displays lawyer information when data is loaded', async () => {
        render(
            <Router>
                <Advertising lawyers={mockLawyers} />
            </Router>
        );

        // Add assertions to check if the lawyer information is displayed
        expect(screen.getByText(mockLawyer.user.name)).toBeInTheDocument();
        expect(screen.getByText(`عنوان: ${mockLawyer.title ? mockLawyer.title : "وکیل"}`)).toBeInTheDocument();

        // You may add more assertions as needed
    });

    // Add more tests for the functionality of the Advertising component
});
