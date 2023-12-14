// // import { render, fireEvent } from '@testing-library/react';
// // import MovingBarComponent from '../MovingBarComponent';

// // describe('MovingBarComponent', () => {
// //     it('renders without crashing', () => {
// //         const { getByText } = render(<MovingBarComponent fullText="Test Text" />);
// //         expect(getByText('Test Text')).toBeInTheDocument();
// //     });

// //     it('changes color on click', () => {
// //         const { getByText, rerender } = render(<MovingBarComponent fullText="Test Text" />);
// //         const textElement = getByText('Test Text');
// //         const initialColor = textElement.style.backgroundColor;
// //         fireEvent.click(textElement);
// //         rerender(<MovingBarComponent fullText="Test Text" />);
// //         expect(textElement.style.backgroundColor).not.toBe(initialColor);
// //     });

// //     it('navigates to /PremiumLawyers on click', () => {
// //         const { getByText } = render(<MovingBarComponent fullText="Test Text" />);
// //         const textElement = getByText('Test Text');
// //         fireEvent.click(textElement);
// //         expect(window.location.href).toBe('/PremiumLawyers');
// //     });
// // });
// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import StaticTextComponent from './StaticTextComponent';

// describe('StaticTextComponent', () => {
//     const text1 = "برای اشنایی با قابلیت های پریمیوم کلیک کنید";
//     const text2 = "برای دسترسی به قابلیت های بیشتر کلیک کنید";

//     it('renders without crashing', () => {
//         render(<StaticTextComponent fullText1={text1} fullText2={text2} />);
//     });

//     it('displays the texts', () => {
//         render(<StaticTextComponent fullText1={text1} fullText2={text2} />);
//         expect(screen.getByText(text1)).toBeInTheDocument();
//         expect(screen.getByText(text2)).toBeInTheDocument();
//     });
// });
