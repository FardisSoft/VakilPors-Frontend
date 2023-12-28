import React from 'react';
import { render, screen } from '@testing-library/react';
import UsersCard from '../UserCard/index';
import { useAuth } from "../../../context/AuthProvider";
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

jest.mock("../../../context/AuthProvider"); // Mock the useAuth hook
jest.mock('axios'); // Mock axios

describe('UsersCard', () => {
    beforeEach(() => {
        useAuth.mockReturnValue({ // Provide the values your component expects
            getAccessToken: jest.fn(() => Promise.resolve('fakeToken')),
        });

        axios.get.mockResolvedValue({ // Mock axios response
            data: {
                data: {
                    name: 'Test User',
                    image_code: 'testImage.png',
                },
            },
        });
    });

    it('should render the component', async () => {
        render(
            <ThemeProvider theme={createTheme()}>
                <Router>
                    <UsersCard />
                </Router>
            </ThemeProvider>
        );

        // Wait for the axios request to resolve
        await screen.findByText('Test User');

        // Check if the user's name is rendered
        expect(screen.getByText('Test User')).toBeInTheDocument();

        // Add more assertions as needed
    });
});
