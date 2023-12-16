import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Lawyer_Jobinfo from "../Lawyer_Jobinfo";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../../context/AuthProvider";
import "@testing-library/jest-dom";

test("updates form input value on change", () => {
  render(
    <Router>
      <AuthProvider>
        <Lawyer_Jobinfo />
      </AuthProvider>
    </Router>
  );

  const nameInput = screen.getByLabelText("سابقه کار");

  fireEvent.change(nameInput, { target: { value: "12" } });

  expect(nameInput.value).toBe("12");
});