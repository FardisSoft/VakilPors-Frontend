import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import VisitPannelStatistics from "../Statistics-v2";
import { AiOutlineAreaChart, AiFillCheckSquare } from "react-icons/ai";
import { Column, Line, Pie, Area, Rose } from "@ant-design/plots";


describe("VisitPannelStatistics component", () => {
    // Mock the useAuth hook
    jest.mock("../../../context/AuthProvider", () => ({
        useAuth: () => ({
            getAccessToken: () => "fake-token",
        }),
    }));

    // Mock the axios module
    jest.mock("axios", () => ({
        get: jest.fn(() => Promise.resolve({ data: mockData })),
    }));

    // Mock the statistics data
    const mockData = {
        dailyVisits: 100,
        monthlyVisits: 3000,
        yearlyVisits: 36000,
        usersCount: 500,
        lawyersCount: 100,
        casesCount: 200,
        messagesCount: 1000,
        weekVisits: [
            { day: "Saturday", count: 50 },
            { day: "Sunday", count: 60 },
            { day: "Monday", count: 70 },
            { day: "Tuesday", count: 80 },
            { day: "Wednesday", count: 90 },
            { day: "Thursday", count: 100 },
            { day: "Friday", count: 110 },
        ],
        lawyerCityCount: [
            { city: "Tehran", count: 50 },
            { city: "Isfahan", count: 40 },
            { city: "Bandar Abbas", count: 30 },
            { city: "Shiraz", count: 20 },
            { city: "Babol", count: 10 },
        ],
        lawyerTitleCount: [
            { title: "Civil Law", count: 40 },
            { title: "Criminal Law", count: 30 },
            { title: "Family Law", count: 20 },
            { title: "Business Law", count: 10 },
            { title: "Other", count: 5 },
        ],
        transactionMonthlyCount: [
            { month: "January", count: 100 },
            { month: "February", count: 200 },
            { month: "March", count: 300 },
            { month: "April", count: 400 },
            { month: "May", count: 500 },
            { month: "June", count: 600 },
            { month: "July", count: 700 },
            { month: "August", count: 800 },
            { month: "September", count: 900 },
            { month: "October", count: 1000 },
            { month: "November", count: 1100 },
            { month: "December", count: 1200 },
        ],
    };

    it("should render the correct title and icons", () => {
        // Arrange: render the component
        render(<VisitPannelStatistics />);

        // Assert: check the title and icons
        expect(screen.getByText(/آمار سایت/i)).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /آمار سایت/i })).toContainElement(
            screen.getByTestId("area-chart-icon")
        );
        expect(screen.getAllByTestId("check-square-icon")).toHaveLength(4);
    });
});

// test('Statistics component renders correctly', () => {
//     const { container } = render(<Statistics />);
//     expect(container).toMatchSnapshot();
//   });
  
//   // Import React here
//   import React from 'react';
  
// import { render, screen, waitFor } from '@testing-library/react';
// import VisitPannelStatistics from '../Statistics-v2';
// import axios from 'axios';

// jest.mock('../../../context/AuthProvider', () => ({
//     useAuth: () => ({
//         getAccessToken: jest.fn().mockResolvedValue('fake_token'),
//     }),
// }));

// jest.mock('axios');

// describe('VisitPannelStatistics', () => {
//     it('fetches and displays statistics', async () => {
//         // Mock the API response
//         axios.get.mockResolvedValue({
//             data: {
//                 dailyVisits: 100,
//                 monthlyVisits: 2000,
//                 yearlyVisits: 24000,
//                 usersCount: 500,
//                 lawyersCount: 100,
//                 casesCount: 200,
//                 messagesCount: 1000,
//                 weekVisits: [],
//                 lawyerCityCount: [],
//                 lawyerTitleCount: [],
//                 transactionMonthlyCount: [],
//             },
//         });

//         // Render the component
//         render(<VisitPannelStatistics />);

//         // Wait for the async actions to complete
//         await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

//         // Check that the component renders the provided icons
//         expect(screen.getByAltText('AiOutlineAreaChart')).toBeInTheDocument();
//         expect(screen.getByAltText('AiFillCheckSquare')).toBeInTheDocument();
//     });
// });
