import { useAuth } from '@clerk/clerk-react';
import { renderHook, waitFor } from '@testing-library/react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'; // Import the plugin
import { useLocation } from 'react-router-dom';
import { Mock, vi } from 'vitest';

import getTrip from '../../api/getTrip';
import postGenerateTrip from '../../api/postGenerateTrip';
import { TIME_DISPLAY_FORMAT } from '../../constants';
import {
  disableActionsAtom,
  disableFormAtom,
  modalPropsAtom,
  openModalAtom,
  tripDetailsAtom,
} from '../../store/atoms';
import useLoader from '../useLoader/useLoader';
import useSnackbar from '../useSnackbar/useSnackbar';

import useFormMapDisplayComponentLogic from './useFormMapDisplayComponentLogic';

// Extend dayjs with customParseFormat plugin
dayjs.extend(customParseFormat);

// Mock external dependencies
vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(),
}));

vi.mock('../../api/getTrip', () => ({
  default: vi.fn(),
}));

vi.mock('../../api/postGenerateTrip', () => ({
  default: vi.fn(),
}));

vi.mock('../useLoader/useLoader', () => ({
  default: vi.fn(() => ({
    openLoader: vi.fn(),
    closeLoader: vi.fn(),
  })),
}));

vi.mock('../useSnackbar/useSnackbar', () => ({
  default: vi.fn(() => ({
    openSnackbar: vi.fn(),
  })),
}));

const mockGetToken = vi.fn(() => Promise.resolve('mock-token'));
vi.mock('@clerk/clerk-react', () => ({
  useAuth: vi.fn(() => ({
    getToken: mockGetToken,
  })),
}));

const mockSetDisableActions = vi.fn();
const mockSetDisableForm = vi.fn();
const mockSetOpenModal = vi.fn();
const mockSetModalProps = vi.fn();
const mockSetTripDetails = vi.fn();

vi.mock('jotai', async (importOriginal) => {
  const actual = await importOriginal<typeof import('jotai')>();
  return {
    ...actual,
    useSetAtom: vi.fn((atom) => {
      if (atom === disableActionsAtom) {
        return mockSetDisableActions;
      }
      if (atom === disableFormAtom) {
        return mockSetDisableForm;
      }
      if (atom === openModalAtom) {
        return mockSetOpenModal;
      }
      if (atom === modalPropsAtom) {
        return mockSetModalProps;
      }
      if (atom === tripDetailsAtom) {
        return mockSetTripDetails;
      }
      return vi.fn(); // Fallback for any unhandled atom
    }),
  };
});

describe('useFormMapDisplayComponentLogic', () => {
  const mockGetMainFormValues = vi.fn();
  const mockResetMainForm = vi.fn();
  const mockResetTripDetails = vi.fn();

  const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

  beforeEach(() => {
    vi.clearAllMocks();
    scrollToSpy.mockClear();

    (useLoader as Mock).mockReturnValue({
      openLoader: vi.fn(),
      closeLoader: vi.fn(),
    });
    (useSnackbar as Mock).mockReturnValue({
      openSnackbar: vi.fn(),
    });
    (useLocation as Mock).mockReturnValue({ state: undefined }); // Default no state
  });

  describe('onClickGenerateTrip', () => {
    it('should call API with correct data and update state on success', async () => {
      const mockFormData = {
        destinations: ['Tokyo'],
        lengthOfTrip: 5,
        arrivalAirport: 'Kansai International Airport (KIX)',
        departureAirport: 'Narita International Airport (NRT)',
        timeOfArrival: dayjs('2025-07-01T10:00:00'),
        timeOfDeparture: dayjs('2025-07-06T15:00:00'),
      };
      const mockTripDetailsResponse = 'Generated trip itinerary';

      mockGetMainFormValues.mockReturnValue(mockFormData);
      (postGenerateTrip as Mock).mockResolvedValue(mockTripDetailsResponse);

      const { result } = renderHook(() =>
        useFormMapDisplayComponentLogic({
          getMainFormValues: mockGetMainFormValues,
          resetMainForm: mockResetMainForm,
          resetTripDetails: mockResetTripDetails,
        })
      );

      await result.current.onClickGenerateTrip();

      expect(mockSetDisableActions).toHaveBeenCalledWith(true);

      expect(postGenerateTrip).toHaveBeenCalledWith({
        destinations: ['Tokyo'],
        lengthOfTrip: 5,
        arrivalAirport: 'Kansai International Airport (KIX)',
        departureAirport: 'Narita International Airport (NRT)',
        timeOfArrival: dayjs('2025-07-01T10:00:00').format(TIME_DISPLAY_FORMAT),
        timeOfDeparture: dayjs('2025-07-06T15:00:00').format(
          TIME_DISPLAY_FORMAT
        ),
      });

      expect(mockSetTripDetails).toHaveBeenCalledWith(mockTripDetailsResponse);
      expect(mockSetDisableForm).toHaveBeenCalledWith(true);

      expect(mockSetDisableActions).toHaveBeenCalledWith(false);
    });

    it('should handle API error and show snackbar', async () => {
      const mockFormData = {
        destinations: ['Tokyo'],
        lengthOfTrip: 5,
        arrivalAirport: 'Kansai International Airport (KIX)',
        departureAirport: 'Narita International Airport (NRT)',
      };
      const errorMessage = 'Network Error';

      mockGetMainFormValues.mockReturnValue(mockFormData);
      (postGenerateTrip as Mock).mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() =>
        useFormMapDisplayComponentLogic({
          getMainFormValues: mockGetMainFormValues,
          resetMainForm: mockResetMainForm,
          resetTripDetails: mockResetTripDetails,
        })
      );

      await result.current.onClickGenerateTrip();

      expect(mockSetDisableActions).toHaveBeenCalledWith(true);
      expect(postGenerateTrip).toHaveBeenCalledTimes(1);
      expect(useSnackbar().openSnackbar).toHaveBeenCalledWith({
        severity: 'error',
        description:
          'There was an error generating your trip. Please try again.',
      });
      expect(mockSetTripDetails).not.toHaveBeenCalled();
      expect(mockSetDisableForm).not.toHaveBeenCalledWith(true);

      expect(mockSetDisableActions).toHaveBeenCalledWith(false);
    });
  });

  describe('onClickEdit', () => {
    it('should open modal with correct props and reset state on proceed', () => {
      const { result } = renderHook(() =>
        useFormMapDisplayComponentLogic({
          getMainFormValues: mockGetMainFormValues,
          resetMainForm: mockResetMainForm,
          resetTripDetails: mockResetTripDetails,
        })
      );

      result.current.onClickEdit();

      expect(mockSetModalProps).toHaveBeenCalledTimes(1);
      const modalProps = mockSetModalProps.mock.calls[0][0];
      expect(modalProps.description).toBe(
        'Editing your trip details will remove the generated itinerary.'
      );
      expect(modalProps.actionText).toBe('Proceed to edit?');
      expect(typeof modalProps.proceedAction).toBe('function');

      expect(mockSetOpenModal).toHaveBeenCalledWith(true);

      modalProps.proceedAction();

      expect(mockSetTripDetails).toHaveBeenCalledWith('');
      expect(mockSetDisableForm).toHaveBeenCalledWith(false);
      expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
      expect(mockSetOpenModal).toHaveBeenCalledWith(false);
    });
  });

  describe('useEffect for initial trip data fetch', () => {
    it('should not fetch data if state is undefined', () => {
      renderHook(() =>
        useFormMapDisplayComponentLogic({
          getMainFormValues: mockGetMainFormValues,
          resetMainForm: mockResetMainForm,
          resetTripDetails: mockResetTripDetails,
        })
      );

      expect(getTrip).not.toHaveBeenCalled();
      expect(useAuth().getToken).not.toHaveBeenCalled();
    });

    it('should fetch and set trip data if state is present', async () => {
      const tripId = 'trip-123';
      const mockTripData = {
        destinations: ['Osaka'],
        lengthOfTrip: 3,
        arrivalAirport: 'Kansai International Airport (KIX)',
        departureAirport: 'Narita International Airport (NRT)',
        timeOfArrival: '10:00 am',
        timeOfDeparture: '03:00 pm',
        tripDetails: 'Osaka itinerary',
      };

      (useLocation as Mock).mockReturnValue({ state: tripId });
      (getTrip as Mock).mockResolvedValue(mockTripData);

      renderHook(() =>
        useFormMapDisplayComponentLogic({
          getMainFormValues: mockGetMainFormValues,
          resetMainForm: mockResetMainForm,
          resetTripDetails: mockResetTripDetails,
        })
      );

      await waitFor(() => {
        expect(getTrip).toHaveBeenCalledWith(tripId, 'mock-token');
      });

      expect(mockSetDisableForm).toHaveBeenCalledWith(true);
      expect(mockSetTripDetails).toHaveBeenCalledWith(mockTripData.tripDetails);

      expect(mockResetMainForm).toHaveBeenCalledTimes(1);
      const resetMainFormArgs = mockResetMainForm.mock.calls[0][0];
      expect(resetMainFormArgs.destinations).toEqual(mockTripData.destinations);
      expect(resetMainFormArgs.lengthOfTrip).toBe(mockTripData.lengthOfTrip);
      expect(resetMainFormArgs.arrivalAirport).toBe(
        mockTripData.arrivalAirport
      );
      expect(resetMainFormArgs.departureAirport).toBe(
        mockTripData.departureAirport
      );

      const currentYearMonthDay = dayjs().format('YYYY-MM-DD');
      expect(dayjs(resetMainFormArgs.timeOfArrival).format('hh:mm a')).toBe(
        '10:00 am'
      );
      expect(dayjs(resetMainFormArgs.timeOfArrival).format('YYYY-MM-DD')).toBe(
        currentYearMonthDay
      );
      expect(dayjs(resetMainFormArgs.timeOfDeparture).format('hh:mm a')).toBe(
        '03:00 pm'
      );
      expect(
        dayjs(resetMainFormArgs.timeOfDeparture).format('YYYY-MM-DD')
      ).toBe(currentYearMonthDay);

      expect(mockResetTripDetails).toHaveBeenCalledWith({
        tripDetails: mockTripData.tripDetails,
      });
    });

    it('should handle error during data fetch', async () => {
      const tripId = 'trip-error';
      const errorMessage = 'Failed to fetch trip';

      (useLocation as Mock).mockReturnValue({ state: tripId });
      (getTrip as Mock).mockRejectedValue(new Error(errorMessage));

      renderHook(() =>
        useFormMapDisplayComponentLogic({
          getMainFormValues: mockGetMainFormValues,
          resetMainForm: mockResetMainForm,
          resetTripDetails: mockResetTripDetails,
        })
      );

      await waitFor(() => {
        expect(mockGetToken).toHaveBeenCalledTimes(1);
      });

      expect(getTrip).toHaveBeenCalledWith(tripId, 'mock-token');
      expect(mockSetDisableForm).toHaveBeenCalledWith(false);
      expect(mockSetTripDetails).not.toHaveBeenCalled();
      expect(mockResetMainForm).not.toHaveBeenCalled();
      expect(mockResetTripDetails).not.toHaveBeenCalled();
    });
  });
});
