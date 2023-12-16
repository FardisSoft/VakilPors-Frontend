import React from "react";
import { render } from "@testing-library/react";
import AddNewCase from "../addNewCase";

import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../../context/AuthProvider";
import { screen } from "@testing-library/react";

test("displays correct page title", () => {
  render(
    <Router>
      <AuthProvider>
        <AddNewCase />
      </AuthProvider>
    </Router>
  );
  const pageTitle = screen.getByText("افزودن پرونده جدید");
  expect(pageTitle).toBeInTheDocument();
});
