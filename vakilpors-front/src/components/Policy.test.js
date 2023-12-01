import React from 'react';
import { render, screen } from '@testing-library/react';
import Policy from './Policy';

test('renders policy component with correct title', () => {
  render(<Policy />);
  const titleElement = screen.getByText(/قوانین سایت/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders policy component with correct content', () => {
  render(<Policy />);
  const lawyersSection = screen.getByText(/قوانین مربوط به وکلا/i);
  expect(lawyersSection).toBeInTheDocument();

  const usersSection = screen.getByText(/قوانین مربوط به کاربران/i);
  expect(usersSection).toBeInTheDocument();
});