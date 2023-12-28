import React from 'react';
import { render, screen } from '@testing-library/react';
import Statistics from '../Statistics';
import { useAuth } from "../../../context/AuthProvider";
import axios from 'axios';

jest.mock("../../../context/AuthProvider"); // Mock the useAuth hook
jest.mock('axios'); // Mock axios

describe('Statistics', () => {
    beforeEach(() => {
        useAuth.mockReturnValue({ // Provide the values your component expects
            getAccessToken: jest.fn(() => Promise.resolve('fakeToken')),
        });

        axios.get.mockResolvedValue({ // Mock axios response
            data: {
                data: {
                    dailyVisits: 100,
                    monthlyVisits: 3000,
                    yearlyVisits: 36000,
                    usersCount: 5000,
                    lawyersCount: 500,
                    casesCount: 2000,
                    messagesCount: 10000,
                },
            },
        });
    });

    it('should render the component', async () => {
        render(<Statistics />);

        // Wait for the axios request to resolve
        await screen.findByText('آمار بازدید سایت');

        // Check if the statistics data is rendered
        expect(screen.getByText('بازدید امروز : 100')).toBeInTheDocument();
        expect(screen.getByText('بازدید این ماه : 3000')).toBeInTheDocument();
        expect(screen.getByText('بازدید امسال : 36000')).toBeInTheDocument();
        expect(screen.getByText('تعداد کاربران : 5000')).toBeInTheDocument();
        expect(screen.getByText('تعداد وکلا : 500')).toBeInTheDocument();
        expect(screen.getByText('تعداد پرونده ها : 2000')).toBeInTheDocument();
        expect(screen.getByText('تعداد پیام ها : 10000')).toBeInTheDocument();
    });
});
