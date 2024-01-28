import React from "react";
import Workinfo from "../Workinfo";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../../context/AuthProvider";
import "@testing-library/jest-dom";

test("render Workinfo component with correct items", () => {
  render(
    <Router>
      <AuthProvider>
        <Workinfo />
      </AuthProvider>
    </Router>
  );

  const titleElements = screen.getAllByText(
    /دعاوی حقوقی|دعاوی خانواده|دعاوی ملکی|دعاوی کیفری|خدمات ثبتی و شرکتی/i
  );
  expect(titleElements.length).toBe(10);

  const imageElements = screen.getAllByRole("img");
  expect(imageElements.length).toBe(5);
});
