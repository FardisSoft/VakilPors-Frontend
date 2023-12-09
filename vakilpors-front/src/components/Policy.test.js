import React from "react";
import { render, screen } from "@testing-library/react";
import Policy from "./Policy";
import { BrowserRouter, Route, Routes } from "react-router-dom";

test("renders policy component with correct title", () => {
  render(<Policy/>);
  const titleElement = screen.getByText(/قوانین وکیل پرس/i);
  expect(titleElement).toBeTruthy();
});

test("renders policy component with correct content", () => {
  render(<Policy/>);
  const lawyersSection = screen.getByText(/قوانین مربوط به وکلا/i);
  expect(lawyersSection).toBeTruthy();

  const usersSection = screen.getByText(/قوانین مربوط به کاربران/i);
  expect(usersSection).toBeTruthy();
});
