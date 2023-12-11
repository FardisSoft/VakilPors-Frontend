import React from "react";
import { render, screen } from "@testing-library/react";
import Register from "../Register";
import { QueryClient, QueryClientProvider } from "react-query";
import "@testing-library/jest-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';

test("inputs", () => {
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/Register" element={<Register />} />
  //     </Routes>
  //   </BrowserRouter>
  render(
    <Router>
      <Register />
    </Router>
  );
  const phinenumberInput = screen.getByLabelText(/شماره موبایل/i);
  const passwordInput = screen.getByLabelText(/رمز/i);
  expect(phinenumberInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});
