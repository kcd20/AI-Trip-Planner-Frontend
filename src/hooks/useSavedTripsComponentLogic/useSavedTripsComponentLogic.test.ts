import { useAuth } from '@clerk/clerk-react';
import { useQueryClient } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { useSetAtom } from 'jotai';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';

import deleteTrip from '../../api/deleteTrip'; // The function to be mocked
import { modalPropsAtom, openModalAtom } from '../../store/atoms'; // The atoms to be mocked (via useSetAtom)

import useSavedTripsComponentLogic from './useSavedTripsComponentLogic'; // Adjust import path as needed

vi.mock('@clerk/clerk-react', () => ({
  useAuth: vi.fn(),
}));

// Mock Tanstack Query's useQueryClient
vi.mock('@tanstack/react-query', () => ({
  useQueryClient: vi.fn(),
}));

vi.mock('jotai', async (importOriginal) => {
  const actual = await importOriginal<typeof import('jotai')>();
  return {
    ...actual,
    useSetAtom: vi.fn(),
  };
});

vi.mock('../../api/deleteTrip', () => ({
  default: vi.fn(), // Mock the default export
}));

describe('useSavedTripsComponentLogic', () => {
  // Mock implementations for the external hooks and functions
  const mockGetToken = vi.fn();
  const mockInvalidateQueries = vi.fn();
  const mockSetOpenModal = vi.fn();
  const mockSetModalProps = vi.fn();
  const mockDeleteTrip = deleteTrip as Mock; // Type assertion for the mocked function

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();

    // Set up mock return values for the hooks
    (useAuth as Mock).mockReturnValue({
      getToken: mockGetToken,
    });
    (useQueryClient as Mock).mockReturnValue({
      invalidateQueries: mockInvalidateQueries,
    });
    // Mock useSetAtom for openModalAtom and modalPropsAtom
    (useSetAtom as Mock).mockImplementation((atom) => {
      if (atom === openModalAtom) {
        return mockSetOpenModal;
      }
      if (atom === modalPropsAtom) {
        return mockSetModalProps;
      }
      return vi.fn();
    });

    mockGetToken.mockResolvedValue('mock-auth-token');
    mockDeleteTrip.mockResolvedValue(undefined);
  });

  it('should set modal props and open the modal when onClickDelete is called', () => {
    const { result } = renderHook(() => useSavedTripsComponentLogic());
    const tripId = 'trip-123';

    result.current.onClickDelete(tripId);

    expect(mockSetModalProps).toHaveBeenCalledTimes(1);
    expect(mockSetModalProps).toHaveBeenCalledWith(
      expect.objectContaining({
        description: 'Are you sure you want to delete this trip?',
        proceedAction: expect.any(Function),
      })
    );
    expect(mockSetOpenModal).toHaveBeenCalledTimes(1);
    expect(mockSetOpenModal).toHaveBeenCalledWith(true);
  });

  it('should call getToken, deleteTrip, invalidateQueries, and close modal when proceedAction is called', async () => {
    const { result } = renderHook(() => useSavedTripsComponentLogic());
    const tripId = 'trip-456';

    result.current.onClickDelete(tripId);

    const setModalPropsCall = mockSetModalProps.mock.calls[0][0];
    const { proceedAction } = setModalPropsCall;

    await proceedAction();

    expect(mockGetToken).toHaveBeenCalledTimes(1);
    expect(mockDeleteTrip).toHaveBeenCalledTimes(1);
    expect(mockDeleteTrip).toHaveBeenCalledWith(tripId, 'mock-auth-token');
    expect(mockInvalidateQueries).toHaveBeenCalledTimes(1);
    expect(mockInvalidateQueries).toHaveBeenCalledWith({
      queryKey: ['savedTrips'],
    });
    expect(mockSetOpenModal).toHaveBeenCalledTimes(2); // Once for opening, once for closing
    expect(mockSetOpenModal).toHaveBeenNthCalledWith(2, false);
  });

  it('should handle errors during proceedAction (e.g., deleteTrip fails)', async () => {
    const { result } = renderHook(() => useSavedTripsComponentLogic());
    const tripId = 'trip-789';

    mockDeleteTrip.mockRejectedValue(new Error()); // Simulate API failure

    result.current.onClickDelete(tripId);
    const setModalPropsCall = mockSetModalProps.mock.calls[0][0];
    const { proceedAction } = setModalPropsCall;

    await expect(() => proceedAction()).rejects.toThrow();

    // Verify that relevant functions were still called up to the point of failure
    expect(mockGetToken).toHaveBeenCalledTimes(1);
    expect(mockDeleteTrip).toHaveBeenCalledTimes(1);
    expect(mockDeleteTrip).toHaveBeenCalledWith(tripId, 'mock-auth-token');
    // invalidateQueries and setOpenModal(false) should not be called if deleteTrip fails
    expect(mockInvalidateQueries).not.toHaveBeenCalled();
    expect(mockSetOpenModal).toHaveBeenCalledTimes(1); // Only the initial call to open modal
    expect(mockSetOpenModal).not.toHaveBeenCalledWith(false);
  });
});
