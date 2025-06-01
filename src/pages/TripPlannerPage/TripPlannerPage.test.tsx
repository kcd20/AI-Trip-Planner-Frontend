import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import { useAtomValue } from 'jotai';
import { MemoryRouter } from 'react-router-dom';
import { Mock, vi } from 'vitest'; // Import vi from vitest

import TripPlannerPage from './TripPlannerPage'; // Adjust the import path if necessary

vi.mock('@clerk/clerk-react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@clerk/clerk-react')>();
  return {
    ...actual,
    useAuth: () => ({
      getToken: vi.fn(() => 'mocked-token'),
    }),
    useUser: () => ({
      isSignedIn: false,
    }),
  };
});

vi.mock('jotai', async () => {
  const actual = await vi.importActual<typeof import('jotai')>('jotai');
  return {
    ...actual,
    useAtomValue: vi.fn(),
  };
});

describe('TripPlannerPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  const mockUseAtomValue = useAtomValue as Mock;

  it('does not render TripDetailsComponent when tripDetailsAtom is null or undefined', () => {
    mockUseAtomValue.mockReturnValue('');

    render(<TripPlannerPage />, { wrapper: MemoryRouter });

    // Expect form fields to be rendered
    expect(screen.getByLabelText(/Prefectures/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Length of Trip \(days\)/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Arrival Airport/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Departure Airport/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Time of Arrival/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Time of Departure/i)).toBeInTheDocument();

    // Expect Japan map to be rendered
    expect(screen.getByTestId('JapanMapComponent')).toBeInTheDocument();

    // Expect Trip details to not be rendered
    expect(
      screen.queryByTestId('TripDetailsComponent')
    ).not.toBeInTheDocument();
  });

  it('renders TripDetailsComponent when tripDetailsAtom has a value', () => {
    mockUseAtomValue.mockReturnValue('Some trip details');
    render(<TripPlannerPage />, { wrapper: MemoryRouter });

    // Expect form fields to be rendered
    expect(screen.getByLabelText(/Prefectures/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Length of Trip \(days\)/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Arrival Airport/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Departure Airport/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Time of Arrival/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Time of Departure/i)).toBeInTheDocument();

    // Expect Japan map to be rendered
    expect(screen.getByTestId('JapanMapComponent')).toBeInTheDocument();

    // Expect Trip details to be rendered
    expect(screen.getByTestId('TripDetailsComponent')).toBeInTheDocument();
  });
});
