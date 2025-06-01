import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import NavbarSavedTripsComponent from './NavbarSavedTripsComponent';

import '@testing-library/jest-dom';

const mockOnClickSavedTrips = vi.fn();
vi.mock(
  '../../hooks/useNavbarSavedTripsComponentLogic/useNavbarSavedTripsComponentLogic',
  () => ({
    default: () => ({
      onClickSavedTrips: mockOnClickSavedTrips(),
    }),
  })
);

vi.mock('@clerk/clerk-react', () => ({
  SignedIn: ({ children }: { children: React.ReactNode }) => children,
}));

describe('NavbarSavedTripsComponent', () => {
  beforeEach(() => {
    mockOnClickSavedTrips.mockClear();
  });

  it('renders correctly and calls onClickSavedTrips on click', () => {
    render(<NavbarSavedTripsComponent />);

    const buttonComponent = screen.getByRole('button', {
      name: 'Saved Trips',
    });

    fireEvent.click(buttonComponent);

    expect(mockOnClickSavedTrips).toHaveBeenCalledTimes(1);
  });
});
