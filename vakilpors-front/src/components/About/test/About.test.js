import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import About from "../About";


// Describe the test suite
describe('About component', () => {
    test('renders About component', () => {
        render(<About />);
        expect(screen.getByText(/درباره ما/i)).toBeInTheDocument();
        expect(screen.getByText(/درباره وکیل پرس/i)).toBeInTheDocument();
    });
});
