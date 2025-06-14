import { useAuth } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeAll, afterEach, describe, it, expect, vi } from 'vitest';

import getSavedTrips from '../../api/getSavedTrips';
import postSaveTrip from '../../api/postSaveTrip';
import useLoader from '../useLoader/useLoader';

import useSavedTripsQuery from './useSavedTripsQuery';

vi.mock('@clerk/clerk-react', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../api/getSavedTrips', () => ({
  default: vi.fn(),
}));

vi.mock('../../api/postSaveTrip', () => ({
  default: vi.fn(),
}));

vi.mock('../useLoader/useLoader', () => ({
  default: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useSavedTripsQuery', () => {
  const mockGetToken = vi.fn(() => Promise.resolve('mock-token'));
  const mockOpenLoader = vi.fn();
  const mockCloseLoader = vi.fn();

  beforeAll(() => {
    (useAuth as any).mockReturnValue({ getToken: mockGetToken });
    (useLoader as any).mockReturnValue({
      openLoader: mockOpenLoader,
      closeLoader: mockCloseLoader,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  it('should fetch saved trips successfully when no savedTrip in sessionStorage', async () => {
    const mockSavedTrips = [{ id: '1', name: 'Trip 1' }];
    (getSavedTrips as any).mockResolvedValue(mockSavedTrips);

    const { result } = renderHook(() => useSavedTripsQuery(), {
      wrapper: createWrapper(),
    });

    expect(mockOpenLoader).toHaveBeenCalledWith();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockGetToken).toHaveBeenCalled();
    expect(getSavedTrips).toHaveBeenCalledWith('mock-token');
    expect(postSaveTrip).not.toHaveBeenCalled();
    expect(result.current.data).toEqual(mockSavedTrips);
    expect(mockCloseLoader).toHaveBeenCalled();
  });

  it('should post saved trip from sessionStorage if there is data and then fetch trips', async () => {
    const savedTripData = {
      destinations: ['Tokyo'],
      lengthOfTrip: 5,
      arrivalAirport: 'Narita International Airport (NRT)',
      departureAirport: 'Narita International Airport (NRT)',
      timeOfArrival: '2025-06-13T17:00:00.000Z',
      timeOfDeparture: '2025-06-13T20:00:00.000Z',
      tripDetails: 'Some details',
    };
    sessionStorage.setItem('savedTrip', JSON.stringify(savedTripData));

    const mockSavedTripsAfterPost = [{ id: '2', name: 'Trip 2' }];
    (postSaveTrip as any).mockResolvedValue(undefined);
    (getSavedTrips as any).mockResolvedValue(mockSavedTripsAfterPost);

    const { result } = renderHook(() => useSavedTripsQuery(), {
      wrapper: createWrapper(),
    });

    expect(mockOpenLoader).toHaveBeenCalled();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockGetToken).toHaveBeenCalled();
    expect(postSaveTrip).toHaveBeenCalledWith(
      {
        destinations: ['Tokyo'],
        lengthOfTrip: 5,
        arrivalAirport: 'Narita International Airport (NRT)',
        departureAirport: 'Narita International Airport (NRT)',
        timeOfArrival: '01:00 am',
        timeOfDeparture: '04:00 am',
        tripDetails: 'Some details',
      },
      'mock-token'
    );
    expect(sessionStorage.getItem('savedTrip')).toBeNull();
    expect(getSavedTrips).toHaveBeenCalledWith('mock-token');
    expect(result.current.data).toEqual(mockSavedTripsAfterPost);
    expect(mockCloseLoader).toHaveBeenCalled();
  });

  it('should handle error during fetching saved trips', async () => {
    const errorMessage = 'Failed to fetch trips';
    (getSavedTrips as any).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useSavedTripsQuery(), {
      wrapper: createWrapper(),
    });

    expect(mockOpenLoader).toHaveBeenCalled();

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(mockGetToken).toHaveBeenCalled();
    expect(getSavedTrips).toHaveBeenCalledWith('mock-token');
    expect(result.current.error).toEqual(new Error(errorMessage));
    expect(mockCloseLoader).toHaveBeenCalled();
  });

  it('should handle error during posting saved trip', async () => {
    const savedTripData = {
      destinations: ['Tokyo'],
      lengthOfTrip: 5,
      arrivalAirport: 'Narita International Airport (NRT)',
      departureAirport: 'Narita International Airport (NRT)',
      timeOfArrival: '2025-06-13T17:00:00.000Z',
      timeOfDeparture: '2025-06-13T20:00:00.000Z',
      tripDetails: 'Some details',
    };
    sessionStorage.setItem('savedTrip', JSON.stringify(savedTripData));

    const postErrorMessage = 'Failed to save trip';
    (postSaveTrip as any).mockRejectedValue(new Error(postErrorMessage));
    (getSavedTrips as any).mockResolvedValue([]);

    const { result } = renderHook(() => useSavedTripsQuery(), {
      wrapper: createWrapper(),
    });

    expect(mockOpenLoader).toHaveBeenCalled();

    await waitFor(() => expect(result.current.isSuccess).toBe(false));

    expect(mockGetToken).toHaveBeenCalled();
    expect(postSaveTrip).toHaveBeenCalled();
    expect(mockCloseLoader).toHaveBeenCalled();
  });
});
