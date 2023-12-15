import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Advertising from '../Advertising';

const mockLawyers = [
    {
        id: 1,
        name: 'Lawyer 1',
        aboutMe: 'About Lawyer 1',
        profileImageUrl: 'url1',
        title: 'Title 1'
    },
    {
        id: 2,
        name: 'Lawyer 2',
        aboutMe: 'About Lawyer 2',
        profileImageUrl: 'url2',
        title: 'Title 2'
    }
];

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('Advertising', () => {
    it('renders without crashing', () => {
        render(<Advertising lawyers={mockLawyers} />);
        expect(screen.getByText('وکیل های کار درست ما')).toBeInTheDocument();
    });

    it('displays the first lawyer by default', () => {
        render(<Advertising lawyers={mockLawyers} />);
        expect(screen.getByText('Lawyer 1')).toBeInTheDocument();
    });

    it('changes displayed lawyer when a dot is clicked', async () => {
        render(<Advertising lawyers={mockLawyers} />);
        const dots = screen.getAllByText('•');
        fireEvent.click(dots[1]);
        expect(await screen.findByText('Lawyer 2')).toBeInTheDocument();
    });
});
