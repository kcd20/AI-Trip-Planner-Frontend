import { renderHook } from '@testing-library/react';
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';

import useNavbarSavedTripsComponentLogic from './useNavbarSavedTripsComponentLogic';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('jotai', async (importOriginal) => {
  const actual = await importOriginal<typeof import('jotai')>();
  return {
    ...actual,
    useAtomValue: vi.fn(),
  };
});

describe('useNavbarSavedTripsComponentLogic', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useAtomValue as Mock).mockReturnValue(false);
    mockNavigate.mockClear();
  });

  it('should return the correct disabled state', () => {
    (useAtomValue as Mock).mockReturnValue(true);

    const { result } = renderHook(() => useNavbarSavedTripsComponentLogic());

    expect(result.current.disabled).toBe(true);
  });

  it('should call navigate to /trips when onClickSavedTrips is called', () => {
    const { result } = renderHook(() => useNavbarSavedTripsComponentLogic());

    result.current.onClickSavedTrips();

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/trips');
  });
});
