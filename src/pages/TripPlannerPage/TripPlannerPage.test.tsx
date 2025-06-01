import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import { useAtomValue } from 'jotai';
import { MemoryRouter } from 'react-router-dom';
import { Mock, vi } from 'vitest';

import TripPlannerPage from './TripPlannerPage'; // Adjust the import path if necessary

vi.mock('jotai', async () => {
  const actual = await vi.importActual<typeof import('jotai')>('jotai');
  return {
    ...actual,
    useAtomValue: vi.fn(),
  };
});

vi.mock(
  '../../components/FormMapDisplayComponent/FormMapDisplayComponent',
  () => ({
    default: vi.fn(() => <div>FormMapDisplayComponent</div>),
  })
);

vi.mock('../../components/TripDetailsComponent/TripDetailsComponent', () => ({
  default: vi.fn(() => <div>TripDetailsComponent</div>),
}));

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
    // Expect FormMapDisplayComponent to be rendered
    expect(screen.getByText('FormMapDisplayComponent')).toBeInTheDocument();

    // Expect TripDetailsComponent to not be rendered
    expect(screen.queryByText('TripDetailsComponent')).not.toBeInTheDocument();
  });

  it('renders TripDetailsComponent when tripDetailsAtom has a value', () => {
    mockUseAtomValue.mockReturnValue('Some trip details');
    render(<TripPlannerPage />, { wrapper: MemoryRouter });

    // Expect FormMapDisplayComponent to be rendered
    expect(screen.getByText('FormMapDisplayComponent')).toBeInTheDocument();

    // Expect TripDetailsComponent to be rendered
    expect(screen.getByText('TripDetailsComponent')).toBeInTheDocument();
  });
});
