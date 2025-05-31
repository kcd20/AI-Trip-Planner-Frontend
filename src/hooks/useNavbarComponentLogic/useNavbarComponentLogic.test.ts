import { renderHook, waitFor } from '@testing-library/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';

import useNavbarComponentLogic from './useNavbarComponentLogic';

// Mock react-router-dom using Vitest's vi.mock
vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(),
  useNavigate: vi.fn(),
}));

describe('useNavbarComponentLogic', () => {
  // Cast the mocked functions for better type inference if needed
  const mockUseNavigate = useNavigate as Mock;
  const mockUseLocation = useLocation as Mock;
  let navigateMock: Mock;

  beforeEach(() => {
    // Reset mocks before each test
    navigateMock = vi.fn();
    mockUseNavigate.mockReturnValue(navigateMock);
    mockUseLocation.mockReturnValue({ pathname: '/' }); // Default pathname
  });

  afterEach(() => {
    // Clear all mocks after each test
    vi.clearAllMocks();
  });

  it('should return isOnLoginOrRegisterPage as true when on /login', () => {
    mockUseLocation.mockReturnValue({ pathname: '/login' });
    const { result } = renderHook(() => useNavbarComponentLogic());
    expect(result.current.isOnLoginOrRegisterPage).toBe(true);
  });

  it('should return isOnLoginOrRegisterPage as true when on /register', () => {
    mockUseLocation.mockReturnValue({ pathname: '/register' });
    const { result } = renderHook(() => useNavbarComponentLogic());
    expect(result.current.isOnLoginOrRegisterPage).toBe(true);
  });

  it('should return isOnLoginOrRegisterPage as false when not on login or register page', () => {
    mockUseLocation.mockReturnValue({ pathname: '/some-other-page' });
    const { result } = renderHook(() => useNavbarComponentLogic());
    expect(result.current.isOnLoginOrRegisterPage).toBe(false);
  });

  it('should navigate to "/" when onClickLandingPage is called', () => {
    const { result } = renderHook(() => useNavbarComponentLogic());
    result.current.onClickLandingPage();
    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  it('should navigate to "/trips" when onClickSavedTrips is called', () => {
    const { result } = renderHook(() => useNavbarComponentLogic());
    result.current.onClickSavedTrips();
    expect(navigateMock).toHaveBeenCalledWith('/trips');
  });

  it('should navigate to "/login" when onClickLogin is called', () => {
    const { result } = renderHook(() => useNavbarComponentLogic());
    result.current.onClickLogin();
    expect(navigateMock).toHaveBeenCalledWith('/login');
  });

  it('should handle menu open and close correctly', async () => {
    const { result } = renderHook(() => useNavbarComponentLogic());
    expect(result.current.open).toBe(false);

    const mockButtonEvent = {
      currentTarget: document.createElement('button'),
    } as React.MouseEvent<HTMLButtonElement>;
    result.current.handleClick(mockButtonEvent);

    await waitFor(() => {
      expect(result.current.anchorEl).toBe(mockButtonEvent.currentTarget);
    });

    expect(result.current.open).toBe(true);

    await waitFor(() => {
      result.current.handleClose();
    });

    expect(result.current.open).toBe(false);
  });
});
