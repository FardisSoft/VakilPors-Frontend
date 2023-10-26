import React from "react";
import styled from "styled-components";

// Define the button styles
// background color =>  #EFEFD0
// when hovered => #004E89
const Button = styled.button`
    // Use props to customize the styles based on the variant, size, and color
    // Use fixed values for the other styles
    width: 12em;
    height: 2.5rem;
    font-size: 1.15rem;
    font-weight: bold;
    background-image: linear-gradient(
        to left,
        #2087E2 50%,
        transparent 50%
    );
    background-position: right bottom;
    background-size: 200% 100%;
    color: #FCFAF6;
    border: solid 2px #2087E2;
    border-radius: 10px;
    transition: all 0.15s ease-out;
    display: block;

    // Add a hover effect
    &:hover {
        background-position: left bottom;
        background-color: #082640;
        color: #FCFAF6;
        border: solid 2px #082640;
    }
`;

// Define the button component
const StyledButton = (props) => {
    // Use the onClick prop to handle the click event
    const handleClick = (event) => {
        if (props.onClick) {
            props.onClick(event);
        }
    };

    // Return the button element with the children prop as the content
    // Pass all the props from StyledButton to Button, including item
    return <Button {...props} onClick={handleClick}>{props.children}</Button>;
};

export default StyledButton;
