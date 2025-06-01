import { render, screen } from '@testing-library/react';
import { expect, vi } from 'vitest';

import SavedTripsPage from './SavedTripsPage';

import '@testing-library/jest-dom';

vi.mock('../../components/SavedTripsComponent/SavedTripsComponent', () => ({
  default: vi.fn(() => <div>Mocked SavedTrips Component</div>),
}));

it('SavedTripsPage renders correctly', () => {
  render(<SavedTripsPage />);

  expect(screen.getByText('Mocked SavedTrips Component')).toBeInTheDocument();
});
