import { useAuth, useUser } from '@clerk/clerk-react';
import { renderHook } from '@testing-library/react';
import { useAtomValue } from 'jotai';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import postSaveTrip from '../../api/postSaveTrip';
import useSnackbar from '../useSnackbar/useSnackbar';

import useTripDetailsComponentLogic from './useTripDetailsComponentLogic';

vi.mock('@clerk/clerk-react');
vi.mock('jotai');
vi.mock('react-hook-form');
vi.mock('react-router-dom');
vi.mock('../../api/postSaveTrip');
vi.mock('../useSnackbar/useSnackbar');

describe('useTripDetailsComponentLogic', () => {
  const mockGetMainFormValues = vi.fn();
  const mockGetToken = vi.fn(() => Promise.resolve('mockToken'));
  const mockNavigate = vi.fn();
  const mockUseAtomValue = vi.fn();
  const mockGetTripDetailsValues = vi.fn();
  const mockResetTripDetails = vi.fn();
  const mockPostSaveTrip = vi.fn();
  const mockOpenSnackbar = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useAuth as any).mockReturnValue({ getToken: mockGetToken });
    (useUser as any).mockReturnValue({ isSignedIn: true });
    (useNavigate as any).mockReturnValue(mockNavigate);
    (useAtomValue as any).mockReturnValue(mockUseAtomValue());
    (useFormContext as any).mockReturnValue({
      getValues: mockGetTripDetailsValues,
      reset: mockResetTripDetails,
    });
    (useSnackbar as any).mockReturnValue({ openSnackbar: mockOpenSnackbar });
    (postSaveTrip as any).mockImplementation(mockPostSaveTrip);
  });

  it('should return correct initial values when signed in', () => {
    const { result } = renderHook(() =>
      useTripDetailsComponentLogic({
        getMainFormValues: mockGetMainFormValues,
      })
    );
    expect(result.current.isSignedIn).toBe(true);
    expect(typeof result.current.saveTrip).toBe('function');
    expect(result.current.tripDetailsRef.current).toBeNull();
    expect(typeof result.current.loginAndSave).toBe('function');
  });

  it('should return isSignedIn as false when not signed in', () => {
    (useUser as any).mockReturnValue({ isSignedIn: false });
    const { result } = renderHook(() =>
      useTripDetailsComponentLogic({
        getMainFormValues: mockGetMainFormValues,
      })
    );
    expect(result.current.isSignedIn).toBe(false);
  });

  describe('saveTrip', () => {
    beforeEach(() => {
      mockGetMainFormValues.mockReturnValue({
        destinations: ['Tokyo'],
        lengthOfTrip: 5,
        arrivalAirport: 'Narita International Airport (NRT)',
        departureAirport: 'Narita International Airport (NRT)',
        timeOfArrival: '2025-06-13T17:00:00.000Z',
        timeOfDeparture: '2025-06-13T20:00:00.000Z',
        tripDetails: 'Some details',
      });
      mockGetTripDetailsValues.mockReturnValue({
        tripDetails: 'Some trip details',
      });
    });

    it('should call postSaveTrip and navigate to /trips on success', async () => {
      const { result } = renderHook(() =>
        useTripDetailsComponentLogic({
          getMainFormValues: mockGetMainFormValues,
        })
      );

      await result.current.saveTrip();

      expect(mockGetToken).toHaveBeenCalled();
      expect(mockPostSaveTrip).toHaveBeenCalledWith(
        {
          destinations: ['Tokyo'],
          lengthOfTrip: 5,
          arrivalAirport: 'Narita International Airport (NRT)',
          departureAirport: 'Narita International Airport (NRT)',
          timeOfArrival: '02:00 am',
          timeOfDeparture: '05:00 am',
          tripDetails: 'Some trip details',
        },
        'mockToken'
      );
      expect(mockNavigate).toHaveBeenCalledWith('/trips');
    });

    it('should call openSnackbar with error details if postSaveTrip fails', async () => {
      mockPostSaveTrip.mockRejectedValue(new Error('API error'));

      const { result } = renderHook(() =>
        useTripDetailsComponentLogic({
          getMainFormValues: mockGetMainFormValues,
        })
      );

      await result.current.saveTrip();

      expect(mockOpenSnackbar).toHaveBeenCalledWith({
        severity: 'error',
        description: 'There was an error saving your trip. Please try again.',
      });
      expect(mockNavigate).not.toHaveBeenCalledWith('/trips');
    });

    it('should throw an error if tripDetails is undefined', async () => {
      mockGetTripDetailsValues.mockReturnValue({ tripDetails: undefined });

      const { result } = renderHook(() =>
        useTripDetailsComponentLogic({
          getMainFormValues: mockGetMainFormValues,
        })
      );

      await expect(result.current.saveTrip()).rejects.toThrow(
        'Trip details is undefined'
      );
    });
  });

  describe('loginAndSave', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'sessionStorage', {
        value: {
          setItem: vi.fn(),
          getItem: vi.fn(),
          clear: vi.fn(),
        },
        writable: true,
      });

      mockGetMainFormValues.mockReturnValue({
        destinations: ['Tokyo'],
        lengthOfTrip: 5,
        arrivalAirport: 'Narita International Airport (NRT)',
        departureAirport: 'Narita International Airport (NRT)',
        timeOfArrival: '2025-06-13T17:00:00.000Z',
        timeOfDeparture: '2025-06-13T20:00:00.000Z',
        tripDetails: 'Some details',
      });
      mockGetTripDetailsValues.mockReturnValue({
        tripDetails: 'A great trip to Japan',
      });
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should store trip details in session storage and navigate to /login', () => {
      const { result } = renderHook(() =>
        useTripDetailsComponentLogic({
          getMainFormValues: mockGetMainFormValues,
        })
      );

      result.current.loginAndSave();

      expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
        'savedTrip',
        JSON.stringify({
          destinations: ['Tokyo'],
          lengthOfTrip: 5,
          arrivalAirport: 'Narita International Airport (NRT)',
          departureAirport: 'Narita International Airport (NRT)',
          timeOfArrival: '2025-06-13T17:00:00.000Z',
          timeOfDeparture: '2025-06-13T20:00:00.000Z',
          tripDetails: 'A great trip to Japan',
        })
      );
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });
});
