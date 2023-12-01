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
