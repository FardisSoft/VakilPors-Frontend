import React from "react";
import { render, screen } from "@testing-library/react";
import MovingTextComponent from "../MovingBar";

test("renders MovingTextComponent with correct text", () => {
    render(<MovingTextComponent />);

    // Replace the test text with the actual text you expect in the component
    const expectedText = 'استفاده از برنامه هفتگی پریمیوم...';

    // Find the element by text content
    const textElement = screen.getByText(expectedText);

    // Assert that the element is in the document
    expect(textElement).toBeInTheDocument();
});

test("changes background color over time", () => {
    render(<MovingTextComponent />);

    // Assuming the background color changes every 2000 milliseconds
    jest.advanceTimersByTime(2000);
    const firstColor = screen.getByTestId("text-container").style.backgroundColor;

    jest.advanceTimersByTime(2000);
    const secondColor = screen.getByTestId("text-container").style.backgroundColor;

    // Assert that the colors are different
    expect(firstColor).not.toBe(secondColor);
});

// Add more tests as needed
