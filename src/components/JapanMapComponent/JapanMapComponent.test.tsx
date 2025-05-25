import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import JapanMapComponent from './JapanMapComponent';

import '@testing-library/jest-dom';

vi.mock('react-hook-form', () => ({
  useWatch: vi.fn(() => 'Kagoshima'),
}));

describe('JapanMapComponent', () => {
  it('renders all fields correctly', () => {
    render(<JapanMapComponent />);

    expect(screen.getByTestId('japanMapComponent')).toBeInTheDocument();
  });
});
