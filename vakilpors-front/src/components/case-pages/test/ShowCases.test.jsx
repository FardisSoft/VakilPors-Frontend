import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShowCases from '../ShowCases'; // Adjust the import path
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Mocking useAuth
jest.mock('../../../context/AuthProvider', () => ({
  ...jest.requireActual('../../../context/AuthProvider'),
  useAuth: () => ({
    getAccessToken: jest.fn(() => 'mockedToken'),
  }),
}));

// Mocking useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    isLawyer: 'true_...', // Adjust based on your scenario
  }),
}));

describe('ShowCases Component', () => {
  test('renders ShowCases component with expected texts', async () => {
    render(
      <ThemeProvider theme={createTheme()}>
        <Router>
          <ShowCases />
        </Router>
      </ThemeProvider>
    );

    // Assuming that you have some loading text to check initially
    const loadingText = screen.getByText('Loading...'); // Adjust based on your loading text

    // Wait for the loading text to disappear
    await screen.findByText('پرونده های من'); // Adjust based on your actual text

    // Check if the component renders correctly
    expect(screen.getByText('پرونده های من')).toBeInTheDocument();
    expect(screen.getByText('پرونده جدید')).toBeInTheDocument();

    // Add more assertions based on your component's content

    // Example: Trigger a button click and check if it updates the state
    userEvent.click(screen.getByText('پرونده جدید'));
    expect(screen.getByText('New Case Form')).toBeInTheDocument(); // Adjust based on your expected behavior
  });
});
