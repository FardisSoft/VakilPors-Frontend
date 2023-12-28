import React from 'react';
import { render, screen } from '@testing-library/react';
import UserSendCases from '../UserSendCases';
import { useAuth } from "../../../context/AuthProvider";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

jest.mock("../../../context/AuthProvider"); // Mock the useAuth hook
jest.mock('axios'); // Mock axios
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));
jest.mock('react-helmet-async', () => ({ Helmet: () => <div /> })); // Mock Helmet

describe('UserSendCases', () => {
    beforeEach(() => {
        useAuth.mockReturnValue({ // Provide the values your component expects
            getAccessToken: jest.fn(() => Promise.resolve('fakeToken')),
        });

        useParams.mockReturnValue({ LawyerId: '123' });
        useNavigate.mockReturnValue(jest.fn());

        axios.get.mockResolvedValue({ // Mock axios response
            data: {
                data: [
                    {
                        name: 'User 1',
                        profileImageUrl: 'http://example.com/user1.jpg',
                        isPremium: true,
                    },
                    {
                        name: 'User 2',
                        profileImageUrl: 'http://example.com/user2.jpg',
                        isPremium: false,
                    },
                ],
            },
        });
    });

    it('should render the component', async () => {
        render(<UserSendCases />);

        // Wait for the axios request to resolve
        await screen.findByText('کاربرانی که برای شما پرونده ارسال کرده اند:');

        // Check if the users are rendered
        expect(screen.getByText('User 1')).toBeInTheDocument();
        expect(screen.getByText('User 2')).toBeInTheDocument();
    });
});
