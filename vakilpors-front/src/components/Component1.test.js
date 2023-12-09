import React from 'react';
import { render, screen } from '@testing-library/react';
import Component1 from './Component1';

test('renders component correctly', () => {
  render(<Component1 />);
  const componentElement = screen.getByText('Hello, World!');
  expect(componentElement).toBeTruthy();
});