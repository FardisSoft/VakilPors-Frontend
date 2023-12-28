import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShowCases from "../ShowCases"; // Adjust the import path
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "../../../context/AuthProvider";
import { useParams } from "react-router-dom";


// // Mocking useAuth
// jest.mock('../../../context/AuthProvider', () => ({
//   ...jest.requireActual('../../../context/AuthProvider'),
//   useAuth: () => ({
//     getAccessToken: jest.fn(() => 'mockedToken'),
//   }),
// }));

// // Mocking useParams
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useParams: () => ({
//     isLawyer: 'true_...', // Adjust based on your scenario
//   }),
// }));

// describe('ShowCases Component', () => {
//   test('renders ShowCases component with expected texts', async () => {
//     render(
//       <ThemeProvider theme={createTheme()}>
//         <Router>
//           <ShowCases />
//         </Router>
//       </ThemeProvider>
//     );

//     // Assuming that you have some loading text to check initially
//     const loadingText = screen.getByText('Loading...'); // Adjust based on your loading text

//     // Wait for the loading text to disappear
//     await screen.findByText('پرونده های من'); // Adjust based on your actual text

//     // Check if the component renders correctly
//     expect(screen.getByText('پرونده های من')).toBeInTheDocument();
//     expect(screen.getByText('پرونده جدید')).toBeInTheDocument();

//     // Add more assertions based on your component's content

//     // Example: Trigger a button click and check if it updates the state
//     userEvent.click(screen.getByText('پرونده جدید'));
//     expect(screen.getByText('New Case Form')).toBeInTheDocument(); // Adjust based on your expected behavior
//   });
// });

//fail
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));
test("displays correct page title", () => {
  useParams.mockReturnValue({ isLawyer: "false" });
  render(
    <Router>
      <AuthProvider>
        <ShowCases />
      </AuthProvider>
    </Router>
  );
  const pagetitle = screen.getByLabelText(
    "پرونده های من"
  );
  expect(pagetitle).toBeInTheDocument();

  const submitButton = screen.getByRole("submit-btn");
  expect(submitButton).toBeInTheDocument();
});


test("field in cart", () => {
  useParams.mockReturnValue({ isLawyer: "false" });
  render(
    <Router>
      <AuthProvider>
        <ShowCases />
      </AuthProvider>
    </Router>
  );
  const pagetitle = screen.getByLabelText(
    "پرونده های من"
  );
  expect(pagetitle).toBeInTheDocument();

  const submitButton = screen.getByRole("submit-btn");
  expect(submitButton).toBeInTheDocument();
});


// jest.mock('card', () => {
//   return function MockCard(props) {
//     return (
//       <div>
//         {/* Render the necessary content for testing */}
//         <div>{props.casei.title}</div>
//         <div>{props.casei.caseName}</div>
//         <div>{props.casei.documentCategory}</div>
//         <div>{props.casei.minimumBudget}</div>
//         <div>{props.casei.maximumBudget}</div>
//       </div>
//     );
//   };
// });

test('displays cases in showcases', () => {
  const cases = [
    {
      title: 'Case 1',
      caseName: 'John Doe',
      documentCategory: 'Category 1',
      minimumBudget: 1000,
      maximumBudget: 5000,
    },
    {
      title: 'Case 2',
      caseName: 'Jane Smith',
      documentCategory: 'Category 2',
      minimumBudget: 2000,
      maximumBudget: 8000,
    },
  ];

  render(<ShowCases cases={cases} />);

  const case1TitleElement = screen.getByText(/Case 1/i);
  expect(case1TitleElement).toBeInTheDocument();

  const case1CaseNameElement = screen.getByText(/John Doe/i);
  expect(case1CaseNameElement).toBeInTheDocument();

  const case1CategoryElement = screen.getByText(/Category 1/i);
  expect(case1CategoryElement).toBeInTheDocument();

  const case1MinBudgetElement = screen.getByText(/1000/i);
  expect(case1MinBudgetElement).toBeInTheDocument();

  const case1MaxBudgetElement = screen.getByText(/5000/i);
  expect(case1MaxBudgetElement).toBeInTheDocument();

  const case2TitleElement = screen.getByText(/Case 2/i);
  expect(case2TitleElement).toBeInTheDocument();

  const case2CaseNameElement = screen.getByText(/Jane Smith/i);
  expect(case2CaseNameElement).toBeInTheDocument();

  const case2CategoryElement = screen.getByText(/Category 2/i);
  expect(case2CategoryElement).toBeInTheDocument();

  const case2MinBudgetElement = screen.getByText(/2000/i);
  expect(case2MinBudgetElement).toBeInTheDocument();

  const case2MaxBudgetElement = screen.getByText(/8000/i);
  expect(case2MaxBudgetElement).toBeInTheDocument();
});

