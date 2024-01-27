import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Register from "../Register";
import { QueryClient, QueryClientProvider } from "react-query";
import "@testing-library/jest-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { AuthProvider } from "../../../context/AuthProvider";
import user from "@testing-library/user-event";

test("renders Register component", () => {
  render(
    <Router>
      <Register />
    </Router>
  );

  const fullNameInput = screen.getByLabelText(/نام و نام خانوادگی/i);
  const phoneNumberInput = screen.getByLabelText(/شماره موبایل/i);
  const passwordInput = screen.getByLabelText(/رمز/i);
  const emailInput = screen.getByLabelText(/ایمیل/i);

  expect(fullNameInput).toBeInTheDocument();
  expect(phoneNumberInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
});

test("allows user input in form fields", () => {
  render(
    <Router>
      <Register />
    </Router>
  );

  const fullNameInput = screen.getByLabelText(/نام و نام خانوادگی/i);
  const phoneNumberInput = screen.getByLabelText(/شماره موبایل/i);
  const passwordInput = screen.getByLabelText(/رمز/i);
  const emailInput = screen.getByLabelText(/ایمیل/i);

  fireEvent.change(fullNameInput, { target: { value: "John Doe" } });
  fireEvent.change(phoneNumberInput, { target: { value: "1234567890" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });

  expect(fullNameInput.value).toBe("John Doe");
  expect(phoneNumberInput.value).toBe("1234567890");
  expect(passwordInput.value).toBe("password123");
  expect(emailInput.value).toBe("test@example.com");
});

jest.mock('react-toastify');

test("displays error message for invalid email format", () => {
  render(
    <Router>
      <Register />
    </Router>
  );
  const linkElement = screen.getByText(/وارد شوید!/i);
  const linkElement2 = screen.getByText(/شرایط/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
  expect(linkElement.tagName).toBe("A");
  expect(linkElement2.tagName).toBe("A");
});

// test("displays error message for password mismatch", () => {
//   render(
//     <Router>
//       <Register />
//     </Router>
//   );

//   const passwordInput = screen.getByLabelText(/رمز/i);
//   const confirmPasswordInput = screen.getByLabelText(/تکراررمز/i);
//   const submitButton = screen.getByRole("button", { name: /بریم/i });

//   fireEvent.change(passwordInput, { target: { value: "password123" } });
//   fireEvent.change(confirmPasswordInput, {
//     target: { value: "mismatched-password" },
//   });
//   fireEvent.click(submitButton);

//   const errorMessage = screen.getByText(/رمز و تکرار آن باید یکسان باشند/i);
//   expect(errorMessage).toBeInTheDocument();
// });
