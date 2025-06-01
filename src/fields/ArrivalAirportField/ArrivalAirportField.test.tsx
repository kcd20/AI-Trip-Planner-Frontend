import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useAtomValue } from 'jotai';
import { FormProvider, useForm } from 'react-hook-form';
import { Mock, vi } from 'vitest';

import { disableActionsAtom, disableFormAtom } from '../../store/atoms';

import ArrivalAirportField from './ArrivalAirportField';

vi.mock('jotai', async () => {
  const actual = await vi.importActual<typeof import('jotai')>('jotai');
  return {
    ...actual,
    useAtomValue: vi.fn(),
  };
});

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

  const mockUseAtomValue = useAtomValue as Mock;

  it('renders the ArrivalAirportField component', () => {
    mockUseAtomValue.mockImplementation((atom) => {
      if (atom === disableFormAtom) {
        return false;
      }
      if (atom === disableActionsAtom) {
        return false;
      }
      throw new Error('Unexpected atom');
    });
    render(<Wrapper />);

    const group = screen.getByTestId('ArrivalAirportField');
    expect(group).toBeInTheDocument();

    const select = screen.getByLabelText(/Arrival Airport/i);
    expect(select).toBeInTheDocument();
    expect(select).toBeEnabled();
  });
  it('disables the select when disableFormAtom is true', () => {
    mockUseAtomValue.mockImplementation((atom) => {
      if (atom === disableFormAtom) {
        return true;
      }
      if (atom === disableActionsAtom) {
        return false;
      }
      throw new Error('Unexpected atom');
    });

    render(<Wrapper />);

    const select = screen.getByLabelText(/Arrival Airport/i);
    expect(select).toBeDisabled();
  });

  it('disables the select when disableActionsAtom is true', () => {
    mockUseAtomValue.mockImplementation((atom) => {
      if (atom === disableFormAtom) {
        return false;
      }
      if (atom === disableActionsAtom) {
        return true;
      }
      throw new Error('Unexpected atom');
    });

    render(<Wrapper />);

    const select = screen.getByLabelText(/Arrival Airport/i);
    expect(select).toBeDisabled();
  });

  it('enables the select when both atoms are false', () => {
    mockUseAtomValue.mockImplementation((atom) => {
      if (atom === disableFormAtom) {
        return false;
      }
      if (atom === disableActionsAtom) {
        return false;
      }
      throw new Error('Unexpected atom');
    });

    render(<Wrapper />);

    const select = screen.getByLabelText(/Arrival Airport/i);
    expect(select).toBeEnabled();
  });
});
