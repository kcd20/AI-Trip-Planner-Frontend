import { useClerk, useUser } from '@clerk/clerk-react';
import { renderHook, waitFor } from '@testing-library/react';
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';

import useNavbarLoginComponentLogic from './useNavbarLoginComponentLogic';

vi.mock('react-router-dom', () => {
  return {
    useNavigate: vi.fn(),
  };
});

vi.mock('@clerk/clerk-react', () => ({
  useClerk: vi.fn(),
  useUser: vi.fn(),
}));

vi.mock('jotai', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@clerk/clerk-react')>();
  return {
    ...actual,
    useAtomValue: vi.fn(),
  };
});

describe('useNavbarLoginComponentLogic', () => {
  const mockNavigate = vi.fn();
  const mockSignOut = vi.fn();

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useClerk as Mock).mockReturnValue({ signOut: mockSignOut });
    (useUser as Mock).mockReturnValue({ isSignedIn: false });
    (useAtomValue as Mock).mockReturnValue(false);
  });

  it('should call navigate to /trips when onClickSavedTrips is called', () => {
    const { result } = renderHook(() => useNavbarLoginComponentLogic());

    result.current.onClickSavedTrips();

    expect(mockNavigate).toHaveBeenCalledWith('/trips');
  });

  it('should call navigate to /login when onClickLogin is called', () => {
    const { result } = renderHook(() => useNavbarLoginComponentLogic());

    result.current.onClickLogin();

    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('should set anchorEl and open when handleClick is called', async () => {
    const { result } = renderHook(() => useNavbarLoginComponentLogic());
    // const mockButton = document.createElement('button');
    const mockEvent = {
      currentTarget: document.createElement('button'),
    } as React.MouseEvent<HTMLButtonElement>;

    result.current.handleClick(mockEvent);
    await waitFor(() => {
      expect(result.current.anchorEl).toBe(mockEvent.currentTarget);
    });
    expect(result.current.open).toBe(true);
  });

  it('should clear anchorEl and close when handleClose is called', async () => {
    const { result } = renderHook(() => useNavbarLoginComponentLogic());
    const mockEvent = {
      currentTarget: document.createElement('button'),
    } as React.MouseEvent<HTMLButtonElement>;

    result.current.handleClick(mockEvent);

    await waitFor(() => {
      expect(result.current.open).toBe(true);
    });

    result.current.handleClose();

    await waitFor(() => {
      expect(result.current.anchorEl).toBeNull();
    });
    expect(result.current.open).toBe(false);
  });
});
