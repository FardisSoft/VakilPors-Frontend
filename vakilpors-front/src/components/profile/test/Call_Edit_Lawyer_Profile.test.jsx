import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Call_Edit_Lawyer_Profile from "../Call_Edit_Lawyer_Profile";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../../context/AuthProvider";
import "@testing-library/jest-dom";
import { createMemoryHistory } from "history";

test("updates form input value on change", () => {
  render(
    <Router>
      <AuthProvider>
        <Call_Edit_Lawyer_Profile />
      </AuthProvider>
    </Router>
  );

  const nameInput = screen.getByLabelText("نام و نام خانوادگی");

  fireEvent.change(nameInput, { target: { value: "John Doe" } });

  expect(nameInput.value).toBe("John Doe");
});

test("renders expected elements", () => {
  render(
    <Router>
      <AuthProvider>
        <Call_Edit_Lawyer_Profile />
      </AuthProvider>
    </Router>
  );

  const name = screen.getByLabelText(/نام و نام خانوادگی/i);
  const email = screen.getByLabelText(/ایمیل/i);
  const city = screen.getByLabelText(/استان-شهر/i);
  const gender = screen.getByLabelText(/جنسیت/i);
  const bio = screen.getByLabelText(/بیوگرافی/i);

  expect(bio).toBeInTheDocument();
  expect(gender).toBeInTheDocument();
  expect(city).toBeInTheDocument();
  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});

test("triggers onClick event when button is clicked", () => {
  render(
    <Router>
      <AuthProvider>
        <Call_Edit_Lawyer_Profile />
      </AuthProvider>
    </Router>
  );

  const button = screen.getByText("ثبت اطلاعات");
  fireEvent.click(button);
});


// test("displays profile picture after upload", () => {
//   render(
//     <Router>
//       <AuthProvider>
//         <Call_Edit_Lawyer_Profile />
//       </AuthProvider>
//     </Router>
//   );

//   const fileInput = screen.getByLabelText(/پس زمینه پروفایل/i);
//   const file = new File(["profile-picture"], "profile.png", {
//     type: "image/png",
//   });
//   fireEvent.change(fileInput, { target: { files: [file] } });

//   const profilePicture = screen.getByAltText(/عکس پروفایل/i);
//   expect(profilePicture).toBeInTheDocument();
//   expect(profilePicture.src).toContain("profile.png");
// });
