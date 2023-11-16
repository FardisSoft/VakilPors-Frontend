import { render, screen } from '@testing-library/react'
import Firsttest from './Firsttest';
// import Login from './components/authentication/Login';

test("Example 1 renders successfully", () => {
    render(<Firsttest/>);
    const element = screen.getByText(/first test/i);
    expect(element).toBeInTheDocument();
})