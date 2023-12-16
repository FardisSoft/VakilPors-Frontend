// NotFound.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NotFound from './404page';
import { BrowserRouter as Router } from "react-router-dom";
import { MemoryRouter } from 'react-router-dom'


jest.mock('lottie-web');

xtest('NotFound renders the title, animation, and button', () => {
    // render the component
    render(
        <MemoryRouter initialEntries={['/not-found']}>
        <NotFound />
        </MemoryRouter>
        )
    // render(<NotFound />);
    // find the title element by the text
    const title = screen.getByText('صفحه مورد نظر یافت نشد یا وجود ندارد...');
    // expect the title element to be in the document
    expect(title).toBeInTheDocument();
    // find the animation element by the alt text;
    // const animation = screen.getByAltText('404 animation');
    // expect the animation element to be in the document
    // expect(animation).toBeInTheDocument();
    // find the button element by the text
    const button = screen.getByText('رفتن به صفحه اصلی');
    // expect the button element to be in the document
    expect(button).toBeInTheDocument();
});


xtest('NotFound navigates to the home page when the button is clicked', () => {
    // mock the useNavigate hook
    const mockNavigate = jest.fn()
    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useNavigate: () => mockNavigate
    }));
    // render the component
    render(
        <MemoryRouter initialEntries={['/not-found']}>
        <NotFound />
        </MemoryRouter>
        )
    // find the button element by the text
    const button = screen.getByText('رفتن به صفحه اصلی');
    // fire a click event on the button element
    fireEvent.click(button);
    // expect the mockNavigate function to be called with the home page path
    expect(mockNavigate).toHaveBeenCalledWith('/');
});