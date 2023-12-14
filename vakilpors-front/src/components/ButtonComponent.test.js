// StyledButton.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StyledButton from './ButtonComponent';
import '@testing-library/jest-dom';


test('StyledButton renders the children prop as the content', () => {
    // render the component with a text as the children prop
    render(<StyledButton>Click Me</StyledButton>);
    // find the button element by the text
    const button = screen.getByText('Click Me');
    // expect the button element to be in the document
    expect(button).toBeInTheDocument();
});


test('StyledButton calls the onClick prop when clicked', () => {
    // create a mock function for the onClick prop
    const mockOnClick = jest.fn();
    // render the component with the mock function as the onClick prop
    render(<StyledButton onClick={mockOnClick}>Click Me</StyledButton>);
    // find the button element by the text
    const button = screen.getByText('Click Me');
    // fire a click event on the button element
    fireEvent.click(button)
    // expect the mock function to be called once
    expect(mockOnClick).toHaveBeenCalledTimes(1);
});


test('StyledButton changes the style when hovered', () => {
    // render the component with a text as the children prop
    render(<StyledButton>Click Me</StyledButton>);
    // find the button element by the text
    const button = screen.getByText('Click Me');
    // get the initial background color of the button element
    const initialBackgroundColor = button.style.backgroundColor;
    // fire a mouse enter event on the button element
    fireEvent.mouseEnter(button);
    // expect the background color of the button element to change
    // expect(button.style.backgroundColor).not.toBe(initialBackgroundColor);
    // fire a mouse leave event on the button element
    fireEvent.mouseLeave(button);
    // expect the background color of the button element to revert back
    // expect(button.style.backgroundColor).toBe(initialBackgroundColor);
});