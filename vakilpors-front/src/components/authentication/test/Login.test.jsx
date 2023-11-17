// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import Login from '../Login';

// test('renders login page correctly', () => {
//   render(<Login />);
  
//   // Assert the presence of login page elements
//   expect(screen.getByLabelText('شماره موبایل')).toBeInTheDocument();
//   expect(screen.getByLabelText('رمز عبور')).toBeInTheDocument();
//   expect(screen.getByRole('button', { name: 'ورود' })).toBeInTheDocument();
//   expect(screen.getByRole('link', { name: 'ثبت نام کنید!' })).toBeInTheDocument();
//   expect(screen.getByRole('link', { name: 'فراموشی رمز عبور' })).toBeInTheDocument();
// });

// test('displays error message when phone number or password are not entered', () => {
//   render(<Login />);
  
//   // Simulate login button click without entering phone number and password
//   fireEvent.click(screen.getByRole('button', { name: 'ورود' }));
  
//   // Assert the presence of error message
//   expect(screen.getByText('لطفا شماره موبایل و رمز عبور را وارد کنید.')).toBeInTheDocument();
// });

// test('displays success message and redirects to homepage on successful login', async () => {
//   render(<Login />);
  
//   // Simulate entering phone number and password
//   fireEvent.change(screen.getByLabelText('شماره موبایل'), { target: { value: '09123456789' } });
//   fireEvent.change(screen.getByLabelText('رمز عبور'), { target: { value: 'mypassword' } });
  
//   // Simulate successful login
//   fireEvent.click(screen.getByRole('button', { name: 'ورود' }));
  
//   // Assert the presence of success message
//   expect(await screen.findByText('با موفقیت وارد شدید.')).toBeInTheDocument();
  
//   // Assert the redirection to the homepage
//   expect(screen.getByText('صفحه اصلی')).toBeInTheDocument();
// });


import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../Login';


describe('Advertising component', () => {
    it('displays lawyer information when data is loaded', async () => {
        render(
            <Router>
                <Login/>
            </Router>
        );

        expect(screen.getByText('لطفا شماره موبایل و رمز عبور را وارد کنید.')).toBeInTheDocument();
        expect(await screen.findByText('با موفقیت وارد شدید.')).toBeInTheDocument();
        expect(screen.getByText('صفحه اصلی')).toBeInTheDocument();
    });
});