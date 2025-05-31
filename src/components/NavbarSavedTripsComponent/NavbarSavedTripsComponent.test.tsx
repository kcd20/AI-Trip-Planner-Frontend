import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import NavbarSavedTripsComponent from './NavbarSavedTripsComponent';

import '@testing-library/jest-dom';

const mockOnClickSavedTrips = vi.fn();
vi.mock('../../hooks/useNavbarComponentLogic/useNavbarComponentLogic', () => ({
  default: () => ({
    onClickSavedTrips: mockOnClickSavedTrips,
  }),
}));

vi.mock('@clerk/clerk-react', () => ({
  SignedIn: ({ children }: { children: React.ReactNode }) => children,
}));

describe('NavbarSavedTripsComponent', () => {
  beforeEach(() => {
    mockOnClickSavedTrips.mockClear();
  });

  it('renders correctly and calls onClickSavedTrips on click', () => {
    render(<NavbarSavedTripsComponent />, { wrapper: MemoryRouter });

    const savedTripsText = screen.getByText('Saved Trips');
    expect(savedTripsText).toBeInTheDocument();

    fireEvent.click(savedTripsText);

    expect(mockOnClickSavedTrips).toHaveBeenCalledTimes(1);
  });
});
