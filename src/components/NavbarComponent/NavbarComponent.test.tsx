import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import NavbarComponent from './NavbarComponent';

import '@testing-library/jest-dom';

vi.mock('../NavbarLoginComponent/NavbarLoginComponent', () => ({
  default: () => <div data-testid="NavbarLoginComponent">Login Component</div>,
}));

vi.mock('../NavbarSavedTripsComponent/NavbarSavedTripsComponent', () => ({
  default: () => (
    <div data-testid="NavbarSavedTripsComponent">Saved Trips Component</div>
  ),
}));

vi.mock('../NavbarTitleComponent/NavbarTitleComponent', () => ({
  default: () => <div data-testid="NavbarTitleComponent">Title Component</div>,
}));

const mockUseNavbarComponentLogic = vi.fn();
vi.mock('../../hooks/useNavbarComponentLogic', () => ({
  default: () => mockUseNavbarComponentLogic(),
}));

describe('NavbarComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders NavbarLoginComponent when isOnLoginOrRegisterPage is false', () => {
    mockUseNavbarComponentLogic.mockReturnValue({
      isOnLoginOrRegisterPage: false,
    });

    render(<NavbarComponent />);

    expect(screen.getByTestId('NavbarTitleComponent')).toBeInTheDocument();
    expect(screen.getByTestId('NavbarSavedTripsComponent')).toBeInTheDocument();
    expect(screen.getByTestId('NavbarLoginComponent')).toBeInTheDocument();
  });

  it('does not render NavbarLoginComponent when isOnLoginOrRegisterPage is true', () => {
    mockUseNavbarComponentLogic.mockReturnValue({
      isOnLoginOrRegisterPage: true,
    });

    render(<NavbarComponent />);

    expect(screen.getByTestId('NavbarTitleComponent')).toBeInTheDocument();
    expect(screen.getByTestId('NavbarSavedTripsComponent')).toBeInTheDocument();
    expect(
      screen.queryByTestId('NavbarLoginComponent')
    ).not.toBeInTheDocument();
  });
});
