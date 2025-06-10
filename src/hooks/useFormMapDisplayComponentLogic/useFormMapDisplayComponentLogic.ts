import { useAuth } from '@clerk/clerk-react';
import dayjs from 'dayjs';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { UseFormGetValues, UseFormReset } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

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
import TravelFormInterface from '../../types/TravelFormInterface';
import useLoader from '../useLoader/useLoader';
import useSnackbar from '../useSnackbar/useSnackbar';

interface UseFormMapDisplayComponentLogicParamsInterface {
  getMainFormValues: UseFormGetValues<TravelFormInterface>;
  resetMainForm: UseFormReset<TravelFormInterface>;
  resetTripDetails: UseFormReset<{
    tripDetails?: string;
  }>;
}

interface UseFormMapDisplayComponentLogicReturnInterface {
  onClickEdit: () => void;
  onClickGenerateTrip: () => Promise<void>;
}

const useFormMapDisplayComponentLogic = ({
  getMainFormValues,
  resetMainForm,
  resetTripDetails,
}: UseFormMapDisplayComponentLogicParamsInterface): UseFormMapDisplayComponentLogicReturnInterface => {
  const { openLoader: openWatchLoader, closeLoader: closeWatchLoader } =
    useLoader('watch');
  const { openSnackbar } = useSnackbar();
  const { getToken } = useAuth();
  const { state } = useLocation();

  const setOpenModal = useSetAtom(openModalAtom);
  const setModalProps = useSetAtom(modalPropsAtom);
  const setDisableAction = useSetAtom(disableActionsAtom);
  const setDisableForm = useSetAtom(disableFormAtom);
  const setTripDetails = useSetAtom(tripDetailsAtom);

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

  const onClickEdit = () => {
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
    setOpenModal(true);
  };

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
    setTripDetails,
    state,
  ]);

  return {
    onClickGenerateTrip,
    onClickEdit,
  };
};

export default useFormMapDisplayComponentLogic;
