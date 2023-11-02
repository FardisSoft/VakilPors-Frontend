import React, { useState, useEffect } from "react";

// Define a custom component that takes props for start, end, duration, and delay
const AnimatedCounter = ({ start, end, duration, delay }) => {
    // Define a state variable for the current number
    const [number, setNumber] = useState(start);

    // Define a useEffect hook that runs once after the component mounts
    useEffect(() => {
        // Define a variable for the start time
        let startTime;

        // Define a helper function that updates the number based on the elapsed time
        const updateNumber = (timestamp) => {
            // If the start time is not defined, set it to the current timestamp
            if (!startTime) startTime = timestamp;

            // Calculate the elapsed time in seconds
            const elapsed = (timestamp - startTime) / 1000;

            // If the elapsed time is less than the duration, update the number using linear interpolation
            if (elapsed < duration) {
                const newNumber = start + (end - start) * (elapsed / duration);
                setNumber(newNumber);

                // Request another animation frame
                requestAnimationFrame(updateNumber);
            } else {
                // If the elapsed time is equal or greater than the duration, set the number to the end value
                setNumber(end);
            }
        };

        // Request an initial animation frame after the delay
        setTimeout(() => {
            requestAnimationFrame(updateNumber);
        }, delay);
    }, [start, end, duration, delay]);

    // Return a JSX element with the formatted number
    return <span>{number.toFixed(0)}</span>;
};

export default AnimatedCounter;