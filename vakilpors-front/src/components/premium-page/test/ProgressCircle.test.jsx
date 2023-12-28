import React from 'react';
import { render } from '@testing-library/react';
import ProgressCircle from '../ProgressCircle';

describe('ProgressCircle', () => {
    it('renders without crashing', () => {
        const { getByText } = render(<ProgressCircle />);
        expect(getByText('8/10')).toBeInTheDocument();
    });
});
