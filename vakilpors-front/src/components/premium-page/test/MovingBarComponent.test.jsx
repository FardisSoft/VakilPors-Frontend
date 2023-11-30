import React from 'react';
import { shallow } from 'enzyme';
import MovingBarComponent from './MovingBarComponent';

describe('MovingBarComponent', () => {
    it('renders without crashing', () => {
        shallow(<MovingBarComponent fullText="Test Text" />);
    });

    it('changes background color every 2 seconds', () => {
        jest.useFakeTimers();

        const wrapper = shallow(<MovingBarComponent fullText="Test Text" />);
        const instance = wrapper.instance();

        // Initial background color
        const initialBackgroundColor = wrapper.find('.movingBar').prop('style').backgroundColor;

        // Trigger the useEffect function
        jest.runOnlyPendingTimers();

        // Check if the background color changes after 2 seconds
        jest.advanceTimersByTime(2000);
        const updatedBackgroundColor = wrapper.find('.movingBar').prop('style').backgroundColor;

        expect(updatedBackgroundColor).not.toBe(initialBackgroundColor);

        jest.useRealTimers();
    });

    it('navigates to the specified page when clicked', () => {
        const mockLocationHref = jest.spyOn(window.location, 'href', 'set');
        const wrapper = shallow(<MovingBarComponent fullText="Test Text" />);

        wrapper.find('.container').simulate('click');
        expect(mockLocationHref).toHaveBeenCalledWith('/PremiumLawyers');
    });
});
