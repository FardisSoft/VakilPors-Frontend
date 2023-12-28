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

test("update another textfield", () => {
  render(
    <Router>
      <AuthProvider>
        <Lawyer_Jobinfo />
      </AuthProvider>
    </Router>
  );

  const nameInput = screen.getByLabelText("تحصیلات");
  fireEvent.change(nameInput, { target: { value: "diplom" } });
  expect(nameInput.value).toBe("diplom");

  const nameInput2 = screen.getByLabelText("شماره پرونده وکالت");
  fireEvent.change(nameInput2, { target: { value: "12345" } });
  expect(nameInput2.value).toBe("12345");
});

test("exist textfield", () => {
  render(
    <Router>
      <AuthProvider>
        <Lawyer_Jobinfo />
      </AuthProvider>
    </Router>
  );

  const education = screen.getByLabelText(/تحصیلات/i);
  const numcase = screen.getByLabelText(/شماره پرونده وکالت/i);

  expect(education).toBeInTheDocument();
  expect(numcase).toBeInTheDocument();
});

test("information", () => {
  render(
    <Router>
      <AuthProvider>
        <Lawyer_Jobinfo />
      </AuthProvider>
    </Router>
  );
  const usersSection = screen.getByText(/ویرایش اطلاعات شغلی/i);
  expect(usersSection).toBeTruthy();
});

//fail
test("reset form after successful submission", () => {
  render(
    <Router>
      <AuthProvider>
        <Lawyer_Jobinfo />
      </AuthProvider>
    </Router>
  );

  const nameInput = screen.getByLabelText("سابقه کار");
  fireEvent.change(nameInput, { target: { value: "10" } });

  const form = screen.getByTestId("job-info-form");
  fireEvent.submit(form);

  expect(nameInput.value).toBe("");
});
