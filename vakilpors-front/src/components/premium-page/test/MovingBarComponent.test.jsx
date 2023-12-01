import { render, fireEvent } from '@testing-library/react';
import MovingBarComponent from './MovingBarComponent';

describe('MovingBarComponent', () => {
    it('renders without crashing', () => {
        const { getByText } = render(<MovingBarComponent fullText="Test Text" />);
        expect(getByText('Test Text')).toBeInTheDocument();
    });

    it('changes color on click', () => {
        const { getByText, rerender } = render(<MovingBarComponent fullText="Test Text" />);
        const textElement = getByText('Test Text');
        const initialColor = textElement.style.backgroundColor;
        fireEvent.click(textElement);
        rerender(<MovingBarComponent fullText="Test Text" />);
        expect(textElement.style.backgroundColor).not.toBe(initialColor);
    });

    it('navigates to /PremiumLawyers on click', () => {
        const { getByText } = render(<MovingBarComponent fullText="Test Text" />);
        const textElement = getByText('Test Text');
        fireEvent.click(textElement);
        expect(window.location.href).toBe('/PremiumLawyers');
    });
});
















// // Import Enzyme and Jest
// import { shallow, mount } from 'enzyme';
// import React from 'react';
// import '@testing-library/jest-dom/extend-expect';

// // Import the component to be tested
// import MovingBarComponent from '../MovingBarComponent;';

// // Write a test suite for the component
// describe('MovingBarComponent', () => {
//     // Write a test case for rendering the component
//     test('renders the component with the given text', () => {
//         // Render the component with shallow rendering
//         const wrapper = shallow(<MovingBarComponent fullText="This is a test" />);

//         // Assert that the text is present in the component
//         expect(wrapper.find('.custom-text').text()).toBe('This is a test ');
//     });

//     // Write a test case for changing the background color
//     test('changes the background color every 2 seconds', () => {
//         // Render the component with full DOM rendering
//         const wrapper = mount(<MovingBarComponent fullText="This is a test" />);

//         // Get the initial background color
//         const initialColor = wrapper.find('.custom-price').prop('style').backgroundColor;

//         // Wait for 2 seconds
//         jest.advanceTimersByTime(2000);

//         // Get the updated background color
//         const updatedColor = wrapper.find('.custom-price').prop('style').backgroundColor;

//         // Assert that the background color has changed
//         expect(updatedColor).not.toBe(initialColor);
//     });

//     // Write a test case for navigating to another page
//     test('navigates to the PremiumLawyers page when clicked', () => {
//         // Render the component with shallow rendering
//         const wrapper = shallow(<MovingBarComponent fullText="This is a test" />);

//         // Mock the window.location.href property
//         Object.defineProperty(window, 'location', {
//             value: {
//                 href: '',
//             },
//             writable: true,
//         });

//         // Simulate a click on the component
//         wrapper.find('.custom-container').simulate('click');

//         // Assert that the window.location.href has changed to the PremiumLawyers page
//         expect(window.location.href).toBe('/PremiumLawyers');
//     });
// });










// // import React from 'react';
// // import { shallow } from 'enzyme';
// // import MovingBarComponent from '../MovingBarComponent;';

// // describe('MovingBarComponent', () => {
// //     it('renders without crashing', () => {
// //         shallow(<MovingBarComponent fullText="Test Text" />);
// //     });

// //     it('changes background color every 2 seconds', () => {
// //         jest.useFakeTimers();

// //         const wrapper = shallow(<MovingBarComponent fullText="Test Text" />);
// //         const instance = wrapper.instance();

// //         // Initial background color
// //         const initialBackgroundColor = wrapper.find('.movingBar').prop('style').backgroundColor;

// //         // Trigger the useEffect function
// //         jest.runOnlyPendingTimers();

// //         // Check if the background color changes after 2 seconds
// //         jest.advanceTimersByTime(2000);
// //         const updatedBackgroundColor = wrapper.find('.movingBar').prop('style').backgroundColor;

// //         expect(updatedBackgroundColor).not.toBe(initialBackgroundColor);

// //         jest.useRealTimers();
// //     });

// //     it('navigates to the specified page when clicked', () => {
// //         const mockLocationHref = jest.spyOn(window.location, 'href', 'set');
// //         const wrapper = shallow(<MovingBarComponent fullText="Test Text" />);

// //         wrapper.find('.container').simulate('click');
// //         expect(mockLocationHref).toHaveBeenCalledWith('/PremiumLawyers');
// //     });
// // });
