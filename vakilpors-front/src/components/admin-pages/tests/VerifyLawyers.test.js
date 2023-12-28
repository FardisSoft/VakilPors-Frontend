// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import VerifyLawyers from '../VerifyLawyers';

// test('renders VerifyLawyers component with correct unverified lawyers count', () => {
//     // Mock the useNavigate function
//     const mockUseNavigate = jest.fn();
//     jest.mock('react-router-dom', () => ({
//         ...jest.requireActual('react-router-dom'),
//         useNavigate: () => mockUseNavigate,
//     }));

//     // Mock the useAuth function
//     jest.mock('../../../context/AuthProvider', () => ({
//         useAuth: () => ({
//             refUserRole: { current: 'Admin' },
//             getAccessToken: jest.fn(),
//         }),
//     }));

//     // Mock the axios.get function
//     jest.mock('axios');
//     const axios = require('axios');
//     axios.get.mockResolvedValue({ data: { data: [] } });

//     const { getByText } = render(<VerifyLawyers />);

//     // Check if the unverified lawyers count is displayed correctly
//     const unverifiedLawyersCountElement = getByText('لیست وکلای تایید نشده :');
//     expect(unverifiedLawyersCountElement).toBeInTheDocument();
//     expect(unverifiedLawyersCountElement.nextSibling.textContent).toBe('0'); // Adjust this based on your test data

//     // Check if the component renders the expected structure
//     expect(screen.getByRole('heading', { name: 'لیست وکلای تایید نشده' })).toBeInTheDocument();
//     expect(screen.getByRole('searchbox')).toBeInTheDocument();
//     expect(screen.getByRole('table')).toBeInTheDocument();
//     expect(screen.getByText('تایید مدارک پرونده کاربر')).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: 'جزئیات پرونده کاربر' })).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: 'دانلود رزومه' })).toBeInTheDocument();
// });

// test('renders lawyer data from API response', () => {
//     // Mock the axios.get function to return lawyer data
//     jest.mock('axios');
//     const axios = require('axios');
//     axios.get.mockResolvedValue({
//         data: {
//             data: [{
//                 name: 'John Doe',
//                 username: 'johndoe',
//                 phone: '+9876543210',
//                 profileImage: 'https://example.com/profile.jpg',
//                 callingCardImage: 'https://example.com/calling-card.jpg',
//                 nationalCardImage: 'https://example.com/national-card.jpg',
//                 resumeLink: 'https://example.com/resume.pdf',
//             }],
//         },
//     });

//     const { getByRole, getByText } = render(<VerifyLawyers />);

//     // Check if the lawyer's name is displayed correctly
//     const lawyerNameElement = getByRole('cell', { name: 'نام وکیل' });
//     expect(lawyerNameElement.textContent).toBe('John Doe');

//     // Check if the lawyer's username is displayed correctly
//     const lawyerUsernameElement = getByRole('cell', { name: 'نام کاربر' });
//     expect(lawyerUsernameElement.textContent).toBe('johndoe');

//     // Check if the lawyer's phone number is displayed correctly
//     const lawyerPhoneNumberElement = getByRole('cell', { name: 'شماره تماس' });
//     expect(lawyerPhoneNumberElement.textContent).toBe('+9876543210');
// });

// test('clicking on "تایید مدارک پرونده کاربر" button triggers handleVerify function', () => {
//     const handleVerifyMock = jest.fn();
//     const verifyLawyers = jest.mock('../VerifyLawyers', () => ({ handleVerify: handleVerifyMock }));
//     const { getByText } = render(<verifyLawyers />);

//     // Click on the "تایید مدارک پرونده کاربر" button
//     getByText('تایید مدارک پرونده کاربر').click();

//     // Verify that the handleVerify function was called
//     expect(handleVerifyMock).toHaveBeenCalledTimes(1);
// });

// test('dialog box opens and closes correctly', () => {
//     const handleOpenDialogMock = jest.fn();
//     const handleCloseDialogMock = jest.fn();
//     const verifyLawyers = jest.mock('../VerifyLawyers', () => ({ handleOpenDialog: handleOpenDialogMock, handleCloseDialog: handleCloseDialogMock }));
//     const { getByText, getByRole } = render(<verifyLawyers />);

//     // Click on "جزئیات پرونده کاربر" button to open the dialog box
//     getByRole('button', { name: 'جزئیات پرونده کاربر' }).click();
//     expect(getByRole('dialog')).toBeInTheDocument();

//     // Click on the "Close" button to close the dialog box
//     getByRole('button', { name: 'Close' }).click();
//     expect(getByRole('dialog')).not.toBeInTheDocument();
// });

// test('resume download functionality', () => {
//     const handleDownloadResumeMock = jest.fn();
//     const verifyLawyers = jest.mock('../VerifyLawyers', () => ({ handleDownloadResume: handleDownloadResumeMock }));
//     const { getByText, getByRole } = render(<verifyLawyers />);

//     // Simulate clicking on the "دانلود رزومه" button
//     getByRole('button', { name: 'دانلود رزومه' }).click();
//     expect(handleDownloadResumeMock).toHaveBeenCalledTimes(1);
// });

// test('error handling', () => {
//     const handleVerifyMock = jest.fn(() => {
//         throw new Error('Error verifying documents');
//     });
//     const verifyLawyers = jest.mock('../VerifyLawyers', () => ({ handleVerify: handleVerifyMock }));
//     const { getByText } = render(<verifyLawyers />);

//     // Simulate clicking on the "تایید مدارک پرونده کاربر" button
//     getByText('تایید مدارک پرونده کاربر').click();

//     // Check if the error message is displayed
//     const errorMessageElement = getByText('Error verifying documents');
//     expect(errorMessageElement).toBeInTheDocument();
// });

// test('accessibility tests', () => {
//     const axe = require('@testing-library/axe');
//     const verifyLawyers = render(<VerifyLawyers />);

//     const accessibilityResults = axe(verifyLawyers, { rules: ['wcag2a'] });
//     expect(accessibilityResults.violations).toHaveLength(0);
// });
import React from 'react';
import VerifyLawyers from '../VerifyLawyers';
import { render, screen } from '@testing-library/react';
import { mockAxios } from '@testing-library/jest-dom/extend-expect';

describe('VerifyLawyers component', () => {
    beforeEach(() => {
        mockAxios.onGet(BASE_API_ROUTE + 'Lawyer/GetAll').mockResolvedValue({
            data: {
                data: [{
                    id: 1,
                    isVerified: false,
                }, {
                    id: 2,
                    isVerified: false,
                }],
            },
        });

        mockAxios.onGet(BASE_API_ROUTE + `Lawyer/VerifyLawyer?lawyerId=1`).mockResolvedValue({
            data: {
                success: true,
            },
        });
    });

    it('should render the component without errors', () => {
        render(<VerifyLawyers />);
        expect(screen.getByText('تایید مدارک وکلا')).toBeInTheDocument();
    });

    it('should fetch lawyers from the API', async () => {
        render(<VerifyLawyers />);
        await tick();
        expect(mockAxios.get).toHaveBeenCalledWith(BASE_API_ROUTE + 'Lawyer/GetAll');
    });

    it('should handle verification success', async () => {
        render(<VerifyLawyers />);
        const verifyButton = screen.getByRole('button', { name: 'تایید مدارک پرونده کاربر' });
        verifyButton.click();
        await tick();
        expect(mockAxios.get).toHaveBeenCalledTimes(2);
        expect(mockAxios.get).toHaveBeenCalledWith(BASE_API_ROUTE + 'Lawyer/VerifyLawyer?lawyerId=1');
        expect(screen.getByText('مدارک وکیل مورد نظر با موفقیت تایید شد')).toBeInTheDocument();
    });

    it('should validate lawyer ID before verification', async () => {
        render(<VerifyLawyers />);
        const verifyButton = screen.getByRole('button', { name: 'تایید مدارک پرونده کاربر' });
        // Invalid lawyer ID
        setLawyerId('invalid_id');
        verifyButton.click();
        await tick();
        expect(mockAxios.get).not.toHaveBeenCalled();
        expect(screen.getByText('لطفا برای تایید مدارک، شماره پرونده را وارد کنید')).toBeInTheDocument();

        // Verify a lawyer that has already been verified
        setLawyerId('2');
        verifyButton.click();
        await tick();
        expect(mockAxios.get).not.toHaveBeenCalled();
        expect(screen.getByText('این پرونده قبلا تایید شده است')).toBeInTheDocument();
    });
});
