import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { describe, it, expect, vi } from 'vitest';

import FormComponent from './FormComponent';

vi.mock('./DestinationsField', () => ({
  default: () => <div data-testid="DestinationsField" />,
}));
vi.mock('./LengthOfTripField', () => ({
  default: () => <div data-testid="LengthOfTripField" />,
}));
vi.mock('./ArrivalAirportField', () => ({
  default: () => <div data-testid="ArrivalAirportField" />,
}));
vi.mock('./DepartureAirportField', () => ({
  default: () => <div data-testid="DepartureAirportField" />,
}));
vi.mock('./TimeOfArrivalField', () => ({
  default: () => <div data-testid="TimeOfArrivalField" />,
}));
vi.mock('./TimeOfDepartureField', () => ({
  default: () => <div data-testid="TimeOfDepartureField" />,
}));

describe('MyComponent', () => {
  const Wrapper = () => {
    const methods = useForm();
    return (
      <FormProvider {...methods}>
        <FormComponent />
      </FormProvider>
    );
  };
  it('renders all fields correctly', () => {
    render(<Wrapper />);

    // Mandatory fields
    expect(screen.getByTestId('destinationsField')).toBeInTheDocument();
    expect(screen.getByTestId('lengthOfTripField')).toBeInTheDocument();

    // Optional fields
    expect(screen.getByTestId('ArrivalAirportField')).toBeInTheDocument();
    expect(screen.getByTestId('departureAirportField')).toBeInTheDocument();
    expect(screen.getByTestId('timeOfArrivalField')).toBeInTheDocument();
    expect(screen.getByTestId('timeOfDepartureField')).toBeInTheDocument();
  });
});
