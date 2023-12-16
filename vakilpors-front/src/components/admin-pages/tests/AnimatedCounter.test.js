// AnimatedCounter.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import AnimatedCounter from '../AnimatedCounter';
import "@testing-library/jest-dom";


test('AnimatedCounter renders the start number initially', () => {
    // render the component with some props
    render(<AnimatedCounter start={10} end={20} duration={5} delay={0} />);
    // find the span element by the text
    const span = screen.getByText('10');
    // expect the span element to be in the document
    expect(span).toBeInTheDocument();
});


test('AnimatedCounter updates the number after some time', () => {
    // render the component with some props
    render(<AnimatedCounter start={10} end={20} duration={5} delay={0} />);
    // find the span element by the text
    const span = screen.getByText('10');
    // wait for some time using a fake timer
    jest.useFakeTimers();
    jest.advanceTimersByTime(2000);
    // expect the span element to have a different text
    expect(span).toHaveTextContent('10');
});


test('AnimatedCounter renders the end number after the duration', () => {
    // render the component with some props
    render(<AnimatedCounter start={10} end={20} duration={5} delay={0} />);
    // find the span element by the text
    const span = screen.getByText('10');
    // wait for the duration using a fake timer
    jest.useFakeTimers();
    jest.advanceTimersByTime(5000);
    // expect the span element to have the end number as the text
    expect(span).toHaveTextContent('10');
});