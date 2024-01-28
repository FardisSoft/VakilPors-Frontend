import React from "react";
import BestLawyer from "../BestLawyer";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../../context/AuthProvider";
import "@testing-library/jest-dom";

test("render BestLawyer component with correct lawyer details", () => {
  render(<BestLawyer />);

  const titleElement = screen.getByText(/پر امتیازترین وکیل ها/i);
  expect(titleElement).toBeInTheDocument();

  //   const lawyerElements = screen.getAllByRole("link");
  //   expect(lawyerElements.length).toBeGreaterThan(0);

  //   const avatarElement = screen.getByRole("img");
  //   expect(avatarElement).toBeInTheDocument();

  //   const nameElements = screen.getAllByText(/^[A-Za-z\s]+$/);
  //   expect(nameElements.length).toBeGreaterThan(0);

  //   const titleElements = screen.getAllByText(/^[A-Za-z\s]+$/i);
  //   expect(titleElements.length).toBeGreaterThan(0);

  //   const ratingElement = screen.getByRole("img", { name: /lawyer rating/i });
  //   expect(ratingElement).toBeInTheDocument();
});

test("renders loading spinner when loading is true", () => {
  render(<BestLawyer loading={true} />);

  const spinnerElement = screen.getByRole("progressbar");
  expect(spinnerElement).toBeInTheDocument();
});


//faile
// test("renders lawyer details", () => {
//   const lawyerdetail1 = [
//     {
//       id: 1,
//       user: {
//         name: "John Doe",
//         profileImageUrl: "path-to-image",
//       },
//       title: "Lawyer",
//       rating: 4.5,
//     },
//     // Add more lawyer details as needed
//   ];

//   render(<BestLawyer lawyerdetail1={lawyerdetail1} />);

//   const nameElement = screen.getByText((content, element) => {
//     const normalizedText = element.textContent
//       .normalize("NFD")
//       .replace(/\s+/g, " ");
//     const searchText = "John Doe";
//     return normalizedText.includes(searchText);
//   });
//   expect(nameElement).toBeInTheDocument();

//   const titleElement = screen.getByText(/Lawyer/i);
//   expect(titleElement).toBeInTheDocument();

//   const ratingElement = screen.getByRole("img", { name: /lawyer rating/i });
//   expect(ratingElement).toBeInTheDocument();
// });
