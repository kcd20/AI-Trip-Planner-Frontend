import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import NavbarLoginComponent from './NavbarLoginComponent';

vi.mock('@clerk/clerk-react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@clerk/clerk-react')>();
  return {
    ...actual,
    UserButton: () => <div>UserButton</div>,
  };
});

const mockOnClickLogin = vi.fn();
const mockOnClickSavedTrips = vi.fn();
const mockIsSignedIn = vi.fn();
vi.mock(
  '../../hooks/useNavbarLoginComponentLogic/useNavbarLoginComponentLogic',
  () => ({
    default: () => ({
      onClickLogin: mockOnClickLogin,
      onClickSavedTrips: mockOnClickSavedTrips(),
      anchorEl: null,
      open: false,
      handleClick: vi.fn(),
      handleClose: vi.fn(),
      signOut: vi.fn(),
      disabled: false,
      isSignedIn: mockIsSignedIn(),
    }),
  })
);

describe('NavbarLoginComponent', () => {
  it('should render UserButton if user is signed in', () => {
    mockIsSignedIn.mockReturnValue(true);
    render(<NavbarLoginComponent />);
    expect(screen.getByText('UserButton')).toBeInTheDocument();
  });

  it('should render Login / Register button if user is not signed in', () => {
    mockIsSignedIn.mockReturnValue(false);
    render(<NavbarLoginComponent />);
    expect(screen.getByText('Login / Register')).toBeInTheDocument();
  });

  // TODO add test for mobile components
});
