import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import TripDetailsComponent from './TripDetailsComponent';

const mockIsSignedIn = vi.fn();
vi.mock('@clerk/clerk-react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@clerk/clerk-react')>();
  return {
    ...actual,
    useAuth: () => ({
      getToken: vi.fn(() => 'mocked-token'),
    }),
    useUser: () => ({
      isSignedIn: mockIsSignedIn(),
    }),
  };
});

vi.mock('../../fields/TripDetailsField/TripDetailsField', () => ({
  default: vi.fn(() => <div>TripDetailsField</div>),
}));

vi.mock(
  '../../hooks/useTripDetailsComponentLogic/useTripDetailsComponentLogic',
  () => ({
    default: () => ({
      tripDetailsRef: vi.fn(),
      saveTrip: vi.fn(),
      loginAndSave: vi.fn(),
    }),
  })
);

describe('TripDetailsComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the form fields and japan map and Log In to Save Trip Details button if user is not signed in', () => {
    mockIsSignedIn.mockReturnValue(false);
    render(<TripDetailsComponent getMainFormValues={vi.fn()} />, {
      wrapper: MemoryRouter,
    });

    // Expect TripDetailsField to be rendered
    expect(screen.getByText('TripDetailsField')).toBeInTheDocument();

    // Expect Log In to Save Trip Details Details button to be rendered
    expect(
      screen.getByRole('button', { name: 'Log In to Save Trip Details' })
    ).toBeInTheDocument();

    // Expect Save Trip Details button to not be rendered
    expect(
      screen.queryByRole('button', { name: 'Save Trip Details' })
    ).not.toBeInTheDocument();
  });

  it('renders the form fields and japan map and Save Trip Details button if user is signed in', () => {
    mockIsSignedIn.mockReturnValue(true);
    render(<TripDetailsComponent getMainFormValues={vi.fn()} />, {
      wrapper: MemoryRouter,
    });

    // Expect TripDetailsField to be rendered
    expect(screen.getByText('TripDetailsField')).toBeInTheDocument();

    // Expect Save Trip Details button to be rendered
    expect(
      screen.getByRole('button', { name: 'Save Trip Details' })
    ).toBeInTheDocument();

    // Expect Log In to Save Trip Details button to not be rendered
    expect(
      screen.queryByRole('button', { name: 'Log In to Save Trip Details' })
    ).not.toBeInTheDocument();
  });
});
