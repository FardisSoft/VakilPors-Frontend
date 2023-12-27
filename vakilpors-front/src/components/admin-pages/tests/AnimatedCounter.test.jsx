import React from 'react';
import { render, act } from '@testing-library/react';
import AnimatedCounter from '../AnimatedCounter';

jest.useFakeTimers();

describe('AnimatedCounter', () => {
    it('should animate from start to end number over the specified duration', () => {
        const { getByText } = render(<AnimatedCounter start={0} end={100} duration={1000} delay={0} />);

        // Assert that the initial number is displayed
        expect(getByText('0')).toBeInTheDocument();

        // Fast-forward half of the duration
        act(() => {
            jest.advanceTimersByTime(500);
        });

        // Assert that the number is halfway to the end
        expect(getByText('50')).toBeInTheDocument();

        // Fast-forward the rest of the duration
        act(() => {
            jest.advanceTimersByTime(500);
        });

        // Assert that the end number is displayed
        expect(getByText('100')).toBeInTheDocument();
    });
});
