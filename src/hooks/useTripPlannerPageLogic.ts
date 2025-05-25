import { useAuth } from '@clerk/clerk-react';
import dayjs from 'dayjs';
import { useSetAtom } from 'jotai';
import { RefObject, useEffect, useRef, useState } from 'react';
import { UseFormGetValues, UseFormReset } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import getTrip from '../api/getTrip';
import postGenerateTrip from '../api/postGenerateTrip';
import postSaveTrip from '../api/postSaveTrip';
import { TIME_DISPLAY_FORMAT } from '../constants';
import {
  disableActionsAtom,
  disableFormAtom,
  modalPropsAtom,
  openModalAtom,
} from '../store/atoms';
import TravelFormInterface from '../types/TravelFormInterface';

import useLoader from './useLoader/useLoader';
import useSnackbar from './useSnackbar';

interface UseTripPlannerPageLogicParamsInterface {
  getMainFormValues: UseFormGetValues<TravelFormInterface>;
  getTripDetailsValues: UseFormGetValues<{
    tripDetails?: string;
  }>;
  resetMainForm: UseFormReset<TravelFormInterface>;
  resetTripDetails: UseFormReset<{
    tripDetails?: string;
  }>;
}
interface UseTripPlannerPageLogicReturnInterface {
  onClickGenerateTrip: () => Promise<void>;
  tripDetails: string;
  saveTrip: () => Promise<void>;
  tripDetailsRef: RefObject<HTMLDivElement | null>;
  loginAndSave: () => void;
  onClickEdit: () => void;
}

const useTripPlannerPageLogic = ({
  getMainFormValues,
  getTripDetailsValues,
  resetTripDetails,
  resetMainForm,
}: UseTripPlannerPageLogicParamsInterface): UseTripPlannerPageLogicReturnInterface => {
  const { openLoader: openWatchLoader, closeLoader: closeWatchLoader } =
    useLoader('watch');
  const { openSnackbar } = useSnackbar();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const tripDetailsRef = useRef<HTMLDivElement>(null);

  const setOpenModal = useSetAtom(openModalAtom);
  const setModalProps = useSetAtom(modalPropsAtom);
  const setDisableAction = useSetAtom(disableActionsAtom);
  const setDisableForm = useSetAtom(disableFormAtom);

  const [tripDetails, setTripDetails] = useState('');

  const onClickGenerateTrip = async () => {
    openWatchLoader();
    setDisableAction(true);
    const {
      destinations,
      lengthOfTrip,
      arrivalAirport,
      departureAirport,
      timeOfArrival,
      timeOfDeparture,
    } = getMainFormValues();

    try {
      const data = await postGenerateTrip({
        destinations,
        lengthOfTrip,
        arrivalAirport,
        departureAirport,
        timeOfArrival: timeOfArrival
          ? dayjs(timeOfArrival).format(TIME_DISPLAY_FORMAT)
          : undefined,
        timeOfDeparture: timeOfDeparture
          ? dayjs(timeOfDeparture).format(TIME_DISPLAY_FORMAT)
          : undefined,
      });
      setTripDetails(data);
      setDisableForm(true);
    } catch (error) {
      openSnackbar({
        severity: 'error',
        description:
          'There was an error generating your trip. Please try again.',
      });
    } finally {
      setDisableAction(false);
      closeWatchLoader();
    }
  };

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

  const onClickEdit = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    setModalProps({
      description:
        'Editing your trip details will remove the generated itinerary.',
      actionText: 'Proceed to edit?',
      proceedAction: () => {
        setTripDetails('');
        setDisableForm(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setOpenModal(false);
      },
    });
  }, [setDisableAction, setDisableForm, setModalProps, setOpenModal]);

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

  /** for when user clicks on view trip details in saved trips page */
  useEffect(() => {
    if (!state) {
      return;
    }

    const fetchData = async () => {
      try {
        const token = await getToken();
        const data = await getTrip(state, token);

        setDisableForm(true);
        setTripDetails(data.tripDetails);

        resetMainForm({
          destinations: data.destinations,
          lengthOfTrip: data.lengthOfTrip,
          arrivalAirport: data.arrivalAirport,
          departureAirport: data.departureAirport,
          timeOfArrival: data.timeOfArrival
            ? dayjs(
                `${dayjs().format('YYYY-MM-DD')} ${data.timeOfArrival}`,
                'YYYY-MM-DD hh:mm a'
              )
            : undefined,
          timeOfDeparture: data.timeOfDeparture
            ? dayjs(
                `${dayjs().format('YYYY-MM-DD')} ${data.timeOfDeparture}`,
                'YYYY-MM-DD hh:mm a'
              )
            : undefined,
        });

        resetTripDetails({
          tripDetails: data.tripDetails,
        });
      } catch (error) {
        setDisableForm(false);
        window.console.error('Error fetching trip data:', error);
      }
    };

    fetchData();
  }, [
    getToken,
    resetMainForm,
    resetTripDetails,
    setDisableAction,
    setDisableForm,
    state,
  ]);

  return {
    onClickGenerateTrip,
    onClickEdit,
    tripDetails,
    saveTrip,
    tripDetailsRef,
    loginAndSave,
  };
};

export default useTripPlannerPageLogic;
