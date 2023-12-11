import { render, screen } from '@testing-library/react';
import ShowCases from '../ShowCases';

test('renders loading spinner when loading is true', () => {
  render(<ShowCases loading={true} />);
  const spinnerElement = screen.getByTestId('spinner');
  expect(spinnerElement).toBeInTheDocument();
});

test('renders list of cases when loading is false and cases exist', () => {
    const mockCases = [
      { id: 1, title: 'Case 1' },
      { id: 2, title: 'Case 2' },
      { id: 3, title: 'Case 3' },
    ];
    render(<ShowCases loading={false} cases={mockCases} />);
    const caseElements = screen.getAllByTestId('case');
    expect(caseElements.length).toBe(mockCases.length);
  });