import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import AllUsersTable from '../AllUsers';
import { useAuth } from '../../../context/AuthProvider';
import axios from 'axios';

// Mock the useAuth hook
jest.mock('../../../context/AuthProvider', () => ({
    useAuth: jest.fn(),
}));

// Mock the axios module
jest.mock('axios');

// Mock the toast.error function
jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
    },
}));

// Mock the getAccessToken function
const mockGetAccessToken = jest.fn();

// Mock the axios.get function
const mockAxiosGet = jest.fn();

// Mock the users data
const mockUsers = {
    data: {
        totalItems: 3,
        results: [
            {
                id: 1,
                name: 'Alice',
                userName: 'alice123',
                phoneNumber: '1234567890',
                email: 'alice@example.com',
                roleName: 'کاربر عادی',
            },
            {
                id: 2,
                name: 'Bob',
                userName: 'bob456',
                phoneNumber: '0987654321',
                email: 'bob@example.com',
                roleName: 'وکیل',
            },
            {
                id: 3,
                name: 'Charlie',
                userName: 'charlie789',
                phoneNumber: '1357924680',
                email: 'charlie@example.com',
                roleName: 'ادمین',
            },
        ],
    },
};

// Before each test, clear the mocks
beforeEach(() => {
    jest.clearAllMocks();
});

test('AllUsersTable renders the title, search fields, and table', async () => {
    // Set up the mock functions
    useAuth.mockReturnValue({ getAccessToken: mockGetAccessToken });
    mockGetAccessToken.mockResolvedValue('fake-token');
    mockAxiosGet.mockResolvedValue(mockUsers);

    // Render the component
    render(<AllUsersTable />);

    // Find the title element by the text
    const title = screen.getByText('مدیریت کاربران');
    // Expect the title element to be in the document
    expect(title).toBeInTheDocument();

    // Find the search fields elements by the labels
    const searchField = screen.getByLabelText('جست‌وجو');
    const roleField = screen.getByLabelText('نقش کاربر');
    const searchButton = screen.getByText('جست‌وجو');
    // Expect the search fields elements to be in the document
    expect(searchField).toBeInTheDocument();
    expect(roleField).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    // Wait for the table element to be rendered
    await waitFor(() => screen.getByRole('table'));
    // Find the table element by the role
    const table = screen.getByRole('table');
    // Expect the table element to be in the document
    expect(table).toBeInTheDocument();
    // Expect the table element to have the users data
    expect(table).toHaveTextContent('Alice');
    expect(table).toHaveTextContent('Bob');
    expect(table).toHaveTextContent('Charlie');
});

test('AllUsersTable filters the users by the search field', async () => {
    // Set up the mock functions
    useAuth.mockReturnValue({ getAccessToken: mockGetAccessToken });
    mockGetAccessToken.mockResolvedValue('fake-token');
    mockAxiosGet.mockResolvedValue(mockUsers);

    // Render the component
    render(<AllUsersTable />);

    // Wait for the table element to be rendered
    await waitFor(() => screen.getByRole('table'));

    // Find the search field element by the label
    const searchField = screen.getByLabelText('جستوجو');
    // Change the value of the search field to 'bob'
    fireEvent.change(searchField, { target: { value: 'bob' } });

    // Find the search button element by the text
    const searchButton = screen.getByText('جستوجو');
    // Click the search button
    fireEvent.click(searchButton);

    // Wait for the table element to be updated
    await waitFor(() => screen.getByRole('table'));
    // Find the table element by the role
    const table = screen.getByRole('table');
    // Expect the table element to have only Bob's data
    expect(table).not.toHaveTextContent('Alice');
    expect(table).toHaveTextContent('Bob');
    expect(table).not.toHaveTextContent('Charlie');
});

test('AllUsersTable filters the users by the role field', async () => {
    // Set up the mock functions
    useAuth.mockReturnValue({ getAccessToken: mockGetAccessToken });
    mockGetAccessToken.mockResolvedValue('fake-token');
    mockAxiosGet.mockResolvedValue(mockUsers);

    // Render the component
    render(<AllUsersTable />);

    // Wait for the table element to be rendered
    await waitFor(() => screen.getByRole('table'));

    // Find the role field element by the label
    const roleField = screen.getByLabelText('نقش کاربر');
    // Change the value of the role field to 'ادمین'
    fireEvent.change(roleField, { target: { value: { name: 'ادمین', code: 3 } } });

    // Find the search button element by the text
    const searchButton = screen.getByText('جستوجو');
    // Click the search button
    fireEvent.click(searchButton);

    // Wait for the table element to be updated
    await waitFor(() => screen.getByRole('table'));
    // Find the table element by the role
    const table = screen.getByRole('table');
    // Expect the table element to have only Charlie's data
    expect(table).not.toHaveTextContent('Alice');
    expect(table).not.toHaveTextContent('Bob');
    expect(table).toHaveTextContent('Charlie');
});

test('AllUsersTable shows an error message when the API call fails', async () => {
    // Set up the mock functions
    useAuth.mockReturnValue({ getAccessToken: mockGetAccessToken });
    mockGetAccessToken.mockResolvedValue('fake-token');
    mockAxiosGet.mockRejectedValue(new Error('API error'));

    // Render the component
    render(<AllUsersTable />);

    // Wait for the toast.error function to be called
    await waitFor(() => expect(toast.error).toHaveBeenCalled());
    // Expect the toast.error function to be called with the error message
    expect(toast.error).toHaveBeenCalledWith(
        'مشکلی در دریافت اطلاعات جدول وجود دارد. لطفا دوباره تلاش کنید.',
        {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            rtl: true,
        }
    );
});
