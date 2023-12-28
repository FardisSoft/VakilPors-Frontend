import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from './Sidebar';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../context/AuthProvider'; // Mock your AuthProvider context

// Mock your context
jest.mock('../context/AuthProvider', () => ({
    ...jest.requireActual('../context/AuthProvider'),
    useAuth: jest.fn(),
}));

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

// Mock your component, assuming you have a default export
jest.mock('../components/premium-page/MovingBar', () => ({
    __esModule: true,
    default: jest.fn(() => <div data-testid="moving-bar">Moving Bar Content</div>),
}));

describe('Sidebar Component', () => {
    beforeEach(() => {
        // Mock the useAuth hook's return values
        const mockUseAuth = {
            refUserRole: { current: 'User' }, // Adjust based on your scenario
            refIsLoggedIn: { current: true }, // Adjust based on your scenario
            getAccessToken: jest.fn(),
            logout: jest.fn(),
        };
        require('../context/AuthProvider').useAuth.mockReturnValue(mockUseAuth);
    });

    test('renders Sidebar component with user links', () => {
        render(
            <Router>
                <AuthProvider>
                    <Sidebar />
                </AuthProvider>
            </Router>
        );

        // Example: Check if the component renders the user name
        expect(screen.getByText('Your User Name')).toBeInTheDocument();

        // Example: Check if the component renders the MovingBar component
        expect(screen.getByTestId('moving-bar')).toBeInTheDocument();
    });

    test('handles logout correctly', () => {
        render(
            <Router>
                <AuthProvider>
                    <Sidebar />
                </AuthProvider>
            </Router>
        );

        // Example: Click on the logout button
        fireEvent.click(screen.getByText('خروج از حساب'));

        // Example: Check if the logout function is called
        expect(require('../context/AuthProvider').useAuth().logout).toHaveBeenCalled();
    });

    // Add more tests for other functionalities as needed
});
