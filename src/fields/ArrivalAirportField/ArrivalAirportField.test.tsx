import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useAtomValue } from 'jotai';
import { FormProvider, useForm } from 'react-hook-form';
import { Mock, vi } from 'vitest';

import ArrivalAirportField from './ArrivalAirportField';

vi.mock('jotai');

const mockedUseAtomValue = useAtomValue as Mock;

describe('ArrivalAirportField', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const Wrapper = () => {
    const methods = useForm();
    return (
      <FormProvider {...methods}>
        <ArrivalAirportField />
      </FormProvider>
    );
  };

  test('renders the ArrivalAirportField component', () => {
    mockedUseAtomValue.mockReturnValue(false); // disableFormAtom and disableActionsAtom return false

    render(<Wrapper />);

    const group = screen.getByTestId('arrivalAirportField');
    expect(group).toBeInTheDocument();

    const select = screen.getByLabelText(/Arrival Airport/i);
    expect(select).toBeInTheDocument();
    expect(select).toBeEnabled();
  });

  test('disables the select when disableFormAtom is true', () => {
    mockedUseAtomValue
      .mockReturnValueOnce(true) // disableFormAtom
      .mockReturnValueOnce(false); // disableActionsAtom

    render(<Wrapper />);

    const select = screen.getByLabelText(/Arrival Airport/i);
    expect(select).toBeDisabled();
  });

  test('disables the select when disableActionsAtom is true', () => {
    mockedUseAtomValue
      .mockReturnValueOnce(false) // disableFormAtom
      .mockReturnValueOnce(true); // disableActionsAtom

    render(<Wrapper />);

    const select = screen.getByLabelText(/Arrival Airport/i);
    expect(select).toBeDisabled();
  });

  test('enables the select when both atoms are false', () => {
    mockedUseAtomValue.mockReturnValue(false); // Both atoms return false

    render(<Wrapper />);

    const select = screen.getByLabelText(/Arrival Airport/i);
    expect(select).toBeEnabled();
  });
});
