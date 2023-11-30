import React from 'react';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter as Router } from 'react-router-dom';
import App, { BASE_API_ROUTE } from './App';

const mockAxios = new MockAdapter(axios);

const mockLawyers = [
    {
        id: 134,
        user: {
            id: 13,
            name: "ترانه",
        },
        title: null,
        city: null,
    },
    {
        id: 1,
        user: {
            id: 100,
            name: "شادی هراتی",
        },
        title: "معاضدتی",
        city: "گلستان",
    },
];

mockAxios.onGet(`${BASE_API_ROUTE}Lawyer/GetAll`).reply(200, {
    data: mockLawyers,
});

describe('App component', () => {
    it('renders the App component with lawyer information and advertising', async () => {
        await act(async () => {
            render(
                <Router>
                    <App />
                </Router>
            );
        });

        await waitFor(() => expect(screen.getByText(mockLawyers[0].user.name)).toBeInTheDocument());

        expect(screen.getByText(`عنوان: ${mockLawyers[0].title ? mockLawyers[0].title : "وکیل"}`)).toBeInTheDocument();
        expect(screen.getByText(`شهر: ${mockLawyers[0].city ? mockLawyers[0].city : "نامشخص"}`)).toBeInTheDocument();

        expect(screen.getByText(mockLawyers[1].user.name)).toBeInTheDocument();
        expect(screen.getByText(`عنوان: ${mockLawyers[1].title ? mockLawyers[1].title : "وکیل"}`)).toBeInTheDocument();
        expect(screen.getByText(`شهر: ${mockLawyers[1].city ? mockLawyers[1].city : "نامشخص"}`)).toBeInTheDocument();
    });

    it('navigates to Lawyer-search-page when "جست و جوی وکلا" button is clicked', async () => {
        const { getByText } = render(
            <Router>
                <App />
            </Router>
        );

        await act(async () => {
            fireEvent.click(getByText('جست و جوی وکلا'));
        });

        await waitFor(() => expect(window.location.pathname).toBe('/Lawyer-search-page'));
    });
});
