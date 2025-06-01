import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import NavbarComponent from './NavbarComponent';

import '@testing-library/jest-dom';

vi.mock('../NavbarLoginComponent/NavbarLoginComponent', () => ({
  default: () => <div>NavbarLoginComponent</div>,
}));

vi.mock('../NavbarSavedTripsComponent/NavbarSavedTripsComponent', () => ({
  default: () => <div>NavbarSavedTripsComponent</div>,
}));

vi.mock('../NavbarTitleComponent/NavbarTitleComponent', () => ({
  default: () => <div>NavbarTitleComponent</div>,
}));

const mockUseNavbarComponentLogic = vi.fn();
vi.mock('../../hooks/useNavbarComponentLogic/useNavbarComponentLogic', () => ({
  default: () => mockUseNavbarComponentLogic(),
}));

describe('NavbarComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders NavbarSavedTripsComponent but not NavbarLoginComponent', () => {
    mockUseNavbarComponentLogic.mockReturnValue({
      isSignedIn: true,
      isOnLoginOrRegisterPage: false,
    });

    render(<NavbarComponent />, { wrapper: MemoryRouter });

    expect(screen.getByText('NavbarTitleComponent')).toBeInTheDocument();
    expect(screen.getByText('NavbarSavedTripsComponent')).toBeInTheDocument();
    expect(screen.getByText('NavbarLoginComponent')).toBeInTheDocument();
  });

  it('does not render NavbarSavedTripsComponent and NavbarLoginComponent', () => {
    mockUseNavbarComponentLogic.mockReturnValue({
      isSignedIn: false,
      isOnLoginOrRegisterPage: true,
    });

    render(<NavbarComponent />, { wrapper: MemoryRouter });

    expect(screen.getByText('NavbarTitleComponent')).toBeInTheDocument();
    expect(
      screen.queryByText('NavbarSavedTripsComponent')
    ).not.toBeInTheDocument();
    expect(screen.queryByText('NavbarLoginComponent')).not.toBeInTheDocument();
  });

  it('renders NavbarLoginComponent but not NavbarSavedTripsComponent', () => {
    mockUseNavbarComponentLogic.mockReturnValue({
      isSignedIn: false,
      isOnLoginOrRegisterPage: false,
    });

    render(<NavbarComponent />, { wrapper: MemoryRouter });

    expect(screen.getByText('NavbarTitleComponent')).toBeInTheDocument();
    expect(
      screen.queryByText('NavbarSavedTripsComponent')
    ).not.toBeInTheDocument();
    expect(screen.getByText('NavbarLoginComponent')).toBeInTheDocument();
  });
});
