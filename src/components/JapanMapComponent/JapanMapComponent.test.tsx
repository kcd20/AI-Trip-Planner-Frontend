import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import JapanMapComponent from './JapanMapComponent';

import '@testing-library/jest-dom';

vi.mock('react-hook-form', () => ({
  useWatch: vi.fn(() => 'Kagoshima'),
}));

describe('JapanMapComponent', () => {
  it('renders the map component', () => {
    render(<JapanMapComponent />);

    expect(screen.getByTestId('JapanMapComponent')).toBeInTheDocument();
  });
});
