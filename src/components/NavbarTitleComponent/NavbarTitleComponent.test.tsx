import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, Mock, vi } from 'vitest';

import useNavbarComponentLogic from '../../hooks/useNavbarComponentLogic/useNavbarComponentLogic'; // Adjust path if needed

import NavbarTitleComponent from './NavbarTitleComponent';

import '@testing-library/jest-dom';

vi.mock('../../hooks/useNavbarComponentLogic/useNavbarComponentLogic', () => ({
  default: vi.fn(),
}));

describe('NavbarTitleComponent', () => {
  it('calls onClickLandingPage when the Box is clicked', async () => {
    const mockOnClickLandingPage = vi.fn();
    (useNavbarComponentLogic as Mock).mockReturnValue({
      onClickLandingPage: mockOnClickLandingPage,
    });

    render(<NavbarTitleComponent />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByTestId('NavbarTitleComponent'));

    expect(mockOnClickLandingPage).toHaveBeenCalledTimes(1);
  });

  it('renders the AirplanemodeActiveIcon', () => {
    render(<NavbarTitleComponent />, { wrapper: MemoryRouter });
    const iconElement = screen.getByTestId('AirplanemodeActiveIcon');
    expect(iconElement).toBeInTheDocument();
  });

  it('renders the correct title text', () => {
    render(<NavbarTitleComponent />, { wrapper: MemoryRouter });
    const titleElement = screen.getByText('AI Japan Trip Planner');
    expect(titleElement).toBeInTheDocument();
  });
});
