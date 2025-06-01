import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import FormMapDisplayComponent from './FormMapDisplayComponent';

vi.mock('@clerk/clerk-react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@clerk/clerk-react')>();
  return {
    ...actual,
    useAuth: () => ({
      getToken: vi.fn(() => 'mocked-token'),
    }),
  };
});

vi.mock('../FormComponent/FormComponent', () => ({
  default: vi.fn(() => <div>FormComponent</div>),
}));

vi.mock('../JapanMapComponent/JapanMapComponent', () => ({
  default: vi.fn(() => <div>JapanMapComponent</div>),
}));

describe('FormMapDisplayComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('it renders the form fields and japan map', () => {
    render(
      <FormMapDisplayComponent
        getMainFormValues={vi.fn()}
        handleSubmit={vi.fn()}
        resetMainForm={vi.fn()}
        resetTripDetails={vi.fn()}
      />,
      { wrapper: MemoryRouter }
    );

    // Expect FormComponent to be rendered
    expect(screen.getByText('FormComponent')).toBeInTheDocument();

    // Expect Japan map to be rendered
    expect(screen.getByText('JapanMapComponent')).toBeInTheDocument();
  });
});
