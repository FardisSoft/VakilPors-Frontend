import React from 'react';
import { render, screen } from '@testing-library/react';
import SkeletonSearch from '../SkeletonSearch';

describe('SkeletonSearch component', () => {
    test('renders SkeletonSearch component', () => {
        render(<SkeletonSearch />);
    });
});