import React from "react";
import { render, screen, act } from "@testing-library/react";
import MovingTextComponent from "../MovingBar";

jest.useFakeTimers();

test("renders MovingTextComponent with correct text", () => {
    render(<MovingTextComponent />);

    const expectedText = 'استفاده از برنامه هفتگی پریمیوم...';
    const textElement = screen.getByText(expectedText);

    expect(textElement).toBeInTheDocument();
});

test("changes background color over time", () => {
    render(<MovingTextComponent />);

    const getBackgroundColor = () =>
        screen.getByTestId("text-container").style.backgroundColor;

    const initialColor = getBackgroundColor();

    act(() => {
        jest.advanceTimersByTime(2000);
    });

    const colorAfterInterval = getBackgroundColor();

    expect(initialColor).not.toBe(colorAfterInterval);
});

test("navigates to /PremiumLawyers on click", () => {
    const { container } = render(<MovingTextComponent />);

    act(() => {
        container.querySelector("a").click();
    });

    expect(window.location.pathname).toBe("/PremiumLawyers");
});

afterEach(() => {
    jest.clearAllTimers();
});
