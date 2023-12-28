import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../Header";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../../context/AuthProvider";
import "@testing-library/jest-dom";

test("show title", () => {
  render(
    <Router>
      <AuthProvider>
        <Header />
      </AuthProvider>
    </Router>
  );
  expect(
    screen.getByText(/گرفتن جواب سوالات حقوقی مثل آب خوردن!/i)
  ).toBeInTheDocument();
  expect(
    screen.getByText(/بهترین وکیل ها رو از اینجا انتخاب کن/i)
  ).toBeInTheDocument();
});

test("navigate to Lawyer Search Page on button click", () => {
  render(
    <Router>
      <AuthProvider>
        <Header />
      </AuthProvider>
    </Router>
  );

  const buttonElement = screen.getByText(/وکیل ها رو از اینجا مشاهده کن/i);
  fireEvent.click(buttonElement);

  expect(window.location.pathname).toBe("/Lawyer-search-page");
});
