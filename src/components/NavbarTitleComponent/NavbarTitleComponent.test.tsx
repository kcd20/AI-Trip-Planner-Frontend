import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, Mock, vi } from 'vitest';

import useNavbarComponentLogic from '../../hooks/useNavbarComponentLogic'; // Adjust path if needed

import NavbarTitleComponent from './NavbarTitleComponent';

import '@testing-library/jest-dom';

vi.mock('../../hooks/useNavbarComponentLogic', () => ({
  default: vi.fn(),
}));

describe('NavbarTitleComponent', () => {
  it('calls onClickLandingPage when the Box is clicked', async () => {
    const mockOnClickLandingPage = vi.fn();
    (useNavbarComponentLogic as Mock).mockReturnValue({
      onClickLandingPage: mockOnClickLandingPage,
    });

    render(<NavbarTitleComponent />);

    await userEvent.click(screen.getByTestId('NavbarTitleComponent'));

    expect(mockOnClickLandingPage).toHaveBeenCalledTimes(1);
  });

  it('renders the AirplanemodeActiveIcon', () => {
    render(<NavbarTitleComponent />);
    const iconElement = screen.getByTestId('AirplanemodeActiveIcon');
    expect(iconElement).toBeInTheDocument();
  });

  it('renders the correct title text', () => {
    render(<NavbarTitleComponent />);
    const titleElement = screen.getByText('AI Japan Trip Planner');
    expect(titleElement).toBeInTheDocument();
  });
});
