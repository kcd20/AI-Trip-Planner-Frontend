import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import FormComponent from './FormComponent';

vi.mock('../../fields/DestinationsField/DestinationsField', () => ({
  default: () => <div>DestinationsField</div>,
}));
vi.mock('../../fields/LengthOfTripField/LengthOfTripField', () => ({
  default: () => <div>LengthOfTripField</div>,
}));
vi.mock('../../fields/ArrivalAirportField/ArrivalAirportField', () => ({
  default: () => <div>ArrivalAirportField</div>,
}));
vi.mock('../../fields/DepartureAirportField/DepartureAirportField', () => ({
  default: () => <div>DepartureAirportField</div>,
}));
vi.mock('../../fields/TimeOfArrivalField/TimeOfArrivalField', () => ({
  default: () => <div>TimeOfArrivalField</div>,
}));
vi.mock('../../fields/TimeOfDepartureField/TimeOfDepartureField', () => ({
  default: () => <div>TimeOfDepartureField</div>,
}));

describe('MyComponent', () => {
  it('renders all fields correctly', () => {
    render(<FormComponent />);

    // Mandatory fields
    expect(screen.getByText('DestinationsField')).toBeInTheDocument();
    expect(screen.getByText('LengthOfTripField')).toBeInTheDocument();

    // Optional fields
    expect(screen.getByText('ArrivalAirportField')).toBeInTheDocument();
    expect(screen.getByText('DepartureAirportField')).toBeInTheDocument();
    expect(screen.getByText('TimeOfArrivalField')).toBeInTheDocument();
    expect(screen.getByText('TimeOfDepartureField')).toBeInTheDocument();
  });
});
