import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "../Login";
import { BrowserRouter as Router } from "react-router-dom";

test("have input for inputs", () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  const usernameInput = screen.getByLabelText(/شماره موبایل/i);
  const passwordInput = screen.getByLabelText(/رمز عبور/i);
  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

// describe("Login component", () => {
//   test("renders login form", () => {
//     render(<Login />);

//     expect(screen.getByLabelText("شماره موبایل")).toBeInTheDocument();
//     expect(screen.getByLabelText("رمز عبور")).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: "ورود" })).toBeInTheDocument();
//     expect(screen.getByRole("link", { name: "ثبت نام کنید!" })).toBeInTheDocument();
//     expect(screen.getByRole("link", { name: "فراموشی رمز عبور" })).toBeInTheDocument();
//   });
// });
