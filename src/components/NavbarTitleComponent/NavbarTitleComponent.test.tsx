import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import NavbarTitleComponent from './NavbarTitleComponent';

import '@testing-library/jest-dom';

const mockOnClickLandingPage = vi.fn();
vi.mock('../../hooks/useNavbarComponentLogic/useNavbarComponentLogic', () => ({
  default: () => ({
    onClickLandingPage: mockOnClickLandingPage(),
  }),
}));

describe('NavbarTitleComponent', () => {
  beforeEach(() => {
    mockOnClickLandingPage.mockClear();
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

  it('calls onClickLandingPage when the title is clicked', async () => {
    render(<NavbarTitleComponent />);

    fireEvent.click(screen.getByTestId('NavbarTitleComponent'));

    expect(mockOnClickLandingPage).toHaveBeenCalledTimes(1);
  });
});
