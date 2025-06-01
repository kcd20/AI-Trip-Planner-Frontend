import { renderHook } from '@testing-library/react';
import { useLocation } from 'react-router-dom';
import { describe, it, expect, vi, Mock } from 'vitest';

import useNavbarComponentLogic from './useNavbarComponentLogic';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useLocation: vi.fn(),
    useNavigate: vi.fn(),
  };
});

vi.mock('@clerk/clerk-react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@clerk/clerk-react')>();
  return {
    ...actual,
    useUser: () => ({
      isSignedIn: false,
    }),
  };
});

describe('useNavbarComponentLogic', () => {
  const mockUseLocation = useLocation as Mock;

  it('should return false for isSignedIn when user is not signed in', () => {
    mockUseLocation.mockReturnValue({ pathname: '/' });
    const { result } = renderHook(() => useNavbarComponentLogic());
    expect(result.current.isSignedIn).toBe(false);
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

  it('should return isOnLoginOrRegisterPage as false when on /trips', () => {
    mockUseLocation.mockReturnValue({ pathname: '/trips' });
    const { result } = renderHook(() => useNavbarComponentLogic());
    expect(result.current.isOnLoginOrRegisterPage).toBe(false);
  });
});
