import { useAuth, useUser } from '@clerk/clerk-react';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import { RefObject, useEffect, useRef } from 'react';
import { useFormContext, UseFormGetValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import postSaveTrip from '../../api/postSaveTrip';
import { TIME_DISPLAY_FORMAT } from '../../constants';
import { tripDetailsAtom } from '../../store/atoms';
import TravelFormInterface from '../../types/TravelFormInterface';

interface UseTripPlannerPageLogicParamsInterface {
  getMainFormValues: UseFormGetValues<TravelFormInterface>;
}
interface UseTripPlannerPageLogicReturnInterface {
  isSignedIn: boolean;
  saveTrip: () => Promise<void>;
  tripDetailsRef: RefObject<HTMLDivElement | null>;
  loginAndSave: () => void;
}

const useTripDetailsComponentLogic = ({
  getMainFormValues,
}: UseTripPlannerPageLogicParamsInterface): UseTripPlannerPageLogicReturnInterface => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const tripDetailsRef = useRef<HTMLDivElement>(null);

  const tripDetails = useAtomValue(tripDetailsAtom);

  const { getValues: getTripDetailsValues, reset: resetTripDetails } =
    useFormContext();

  const saveTrip = async () => {
    const {
      destinations,
      lengthOfTrip,
      arrivalAirport,
      departureAirport,
      timeOfArrival,
      timeOfDeparture,
    } = getMainFormValues();

    const { tripDetails: tripDetailsFormValue } = getTripDetailsValues();

    if (!tripDetailsFormValue) {
      throw new Error('Trip details is undefined');
    }

    try {
      const token = await getToken();
      await postSaveTrip(
        {
          destinations,
          lengthOfTrip,
          arrivalAirport: arrivalAirport ?? undefined,
          departureAirport: departureAirport ?? undefined,
          timeOfArrival: timeOfArrival
            ? dayjs(timeOfArrival).format(TIME_DISPLAY_FORMAT)
            : undefined,
          timeOfDeparture: timeOfDeparture
            ? dayjs(timeOfDeparture).format(TIME_DISPLAY_FORMAT)
            : undefined,
          tripDetails: tripDetailsFormValue,
        },
        token
      );
      navigate('/trips');
    } catch (error) {
      window.console.log(error);
    }
  };

  const loginAndSave = () => {
    const {
      destinations,
      lengthOfTrip,
      arrivalAirport,
      departureAirport,
      timeOfArrival,
      timeOfDeparture,
    } = getMainFormValues();

    const { tripDetails: tripDetailsFormValue } = getTripDetailsValues();

    sessionStorage.setItem(
      'savedTrip',
      JSON.stringify({
        destinations,
        lengthOfTrip,
        arrivalAirport,
        departureAirport,
        timeOfArrival,
        timeOfDeparture,
        tripDetails: tripDetailsFormValue,
      })
    );
    navigate('/login');
  };

  /** to prepopulate the trip details */
  useEffect(() => {
    if (tripDetails && tripDetailsRef.current) {
      resetTripDetails({ tripDetails });
    }
  }, [resetTripDetails, tripDetails]);

  /** to scroll to the trip details section */
  useEffect(() => {
    if (tripDetails && tripDetailsRef.current) {
      const targetPosition =
        tripDetailsRef.current.getBoundingClientRect().top +
        window.scrollY -
        20;
      setTimeout(() => {
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }, 500);
    }
  }, [tripDetails]);

  return {
    isSignedIn: isSignedIn ?? false,
    saveTrip,
    tripDetailsRef,
    loginAndSave,
  };
};

export default useTripDetailsComponentLogic;
