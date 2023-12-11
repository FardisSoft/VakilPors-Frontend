import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "../Login";
import "@testing-library/jest-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../../../context/AuthProvider";
import { HelmetProvider } from "react-helmet-async";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "../../Sidebar";
import { fireEvent, getByRole, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { BASE_API_ROUTE } from "../../../Constants";

describe("Login Component", () => {
  it("should have input fields", () => {
    render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );
    const passwordInput = screen.getByLabelText(/رمز عبور/i);
    const phoneNumberInput = screen.getByLabelText(/شماره موبایل/i);

    expect(passwordInput).toBeInTheDocument();
    expect(phoneNumberInput).toBeInTheDocument();
  });

  it("test number of textfield", () => {
    render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(1);
  });

  test("have submit button", () => {
    render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );
    const submitButton = screen.getByRole("submit-btn");
    expect(submitButton).toBeInTheDocument();
  });

  test("have link to signup", () => {
    const { getByText } = render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );
    const linkElement = getByText(/فراموشی رمز عبور/i);
    const linkElement2 = getByText(/ثبت نام کنید!/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement2).toBeInTheDocument();
    expect(linkElement.tagName).toBe("A");
    expect(linkElement2.tagName).toBe("A");
  });

  // test("should make a POST request on form submission", async () => {
  //   const mock = new MockAdapter(axios);
  //   const mockResponse = { success: true, token: "mockToken" };
  //   mock.onPost(BASE_API_ROUTE + 'Auth/login').reply(200, mockResponse);

  //   render(
  //     <Router>
  //       <AuthProvider>
  //         <Login/>
  //       </AuthProvider>
  //     </Router>
  //   );

  //   const passwordInput = screen.getByLabelText(/رمز عبور/i);
  //   const phoneNumberInput = screen.getByLabelText(/شماره موبایل/i);
  //   const submitButton = screen.getByRole("submit-btn");

  //   fireEvent.change(phoneNumberInput, { target: { value: "1234567890" } });
  //   fireEvent.change(passwordInput, { target: { value: "password123" } });
  //   fireEvent.click(submitButton);

  //   await waitFor(() => {
  //     expect(mock.history.post.length).toBe(1);
  //     // expect(mock.history.post[0].url).toBe("/api/login");
  //     // expect(mock.history.post[0].data).toEqual({
  //     //   phoneNumber: "1234567890",
  //     //   password: "password123",
  //     // });
  //   });
  // });

  jest.mock("axios");

  test("should make a POST request on form submission", async () => {
    const mockResponse = { success: true, token: "mockToken" };
    axios.post.mockResolvedValueOnce({ data: mockResponse });

    render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );

    const passwordInput = screen.getByLabelText(/رمز عبور/i);
    const phoneNumberInput = screen.getByLabelText(/شماره موبایل/i);
    const submitButton = screen.getByRole("submit-btn");

    fireEvent.change(phoneNumberInput, { target: { value: "1234567890" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      // expect(axios.post).toHaveBeenCalledWith(BASE_API_ROUTE + "Auth/login", {
      //   phoneNumber: "1234567890",
      //   password: "password123",
      // });
    });
  });
});
