import React from 'react';
import { shallow, mount } from 'enzyme';
import MovingBarComponent from '../MovingBarComponent';

describe('MovingBarComponent', () => {
    // Write a test case for rendering the component
    test('renders the component with the given text', () => {
        // Render the component with shallow rendering
        const wrapper = shallow(<MovingBarComponent fullText="This is a test" />);

        // Assert that the text is present in the component
        expect(wrapper.find('.textContainer').text()).toBe('This is a test ');
    });

    // Write a test case for changing the background color
    test('changes the background color every 2 seconds', () => {
        // Render the component with full DOM rendering
        const wrapper = mount(<MovingBarComponent fullText="This is a test" />);

        // Get the initial background color
        const initialColor = wrapper.find('.CardContent').prop('style').backgroundColor;

        // Wait for 2 seconds
        jest.advanceTimersByTime(2000);

        // Get the updated background color
        const updatedColor = wrapper.find('.CardContent').prop('style').backgroundColor;

        // Assert that the background color has changed
        expect(updatedColor).not.toBe(initialColor);
    });

    // Write a test case for navigating to another page
    test('navigates to the PremiumLawyers page when clicked', () => {
        // Render the component with shallow rendering
        const wrapper = shallow(<MovingBarComponent fullText="This is a test" />);

        // Mock the window.location.href property
        Object.defineProperty(window, 'location', {
            value: {
                href: '',
            },
            writable: true,
        });

        // Simulate a click on the component
        wrapper.find('.container').simulate('click');

        // Assert that the window.location.href has changed to the PremiumLawyers page
        expect(window.location.href).toBe('/PremiumLawyers');
    });
});
