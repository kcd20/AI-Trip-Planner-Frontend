import { useAuth, useUser } from '@clerk/clerk-react';
import Box from '@mui/system/Box';
import axios from 'axios';
import dayjs from 'dayjs';
import { useSetAtom } from 'jotai';
import { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';

import ButtonComponent from '../components/common/ButtonComponent';
import FormComponent from '../components/FormComponent';
import JapanMapComponent from '../components/JapanMapComponent';
import theme from '../config/theme';
import { TIME_DISPLAY_FORMAT, TRAVEL_FORM_DEFAULT_VALUES } from '../constants';
import TripDetailsField from '../fields/TripDetailsField';
import useLoader from '../hooks/useLoader';
import useSnackbar from '../hooks/useSnackbar';
import {
  disableActionsAtom,
  modalPropsAtom,
  openModalAtom,
} from '../store/atoms';
import TravelFormInterface from '../types/TravelFormInterface';

const classes = {
  root: {
    display: 'flex',
    width: '100%',
  } as CSSProperties,
  form: {
    width: '35%',
    padding: '2rem',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  } as CSSProperties,
} as const;

const TripPlannerPage: FC = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();
  const mainFormMethods = useForm<TravelFormInterface>({
    mode: 'all',
    shouldUnregister: true,
    defaultValues: TRAVEL_FORM_DEFAULT_VALUES,
  });
  const {
    getValues: getMainFormValues,
    handleSubmit,
    reset: resetMainForm,
  } = mainFormMethods;

  const tripDetailsFormMethods = useForm<{ tripDetails?: string }>({
    mode: 'all',
    shouldUnregister: true,
  });
  const { getValues: getTripDetailsValues, reset: resetTripDetails } =
    tripDetailsFormMethods;
  const [isGeneratingTripDetails, setIsGeneratingTripDetails] = useState(false);
  const tripDetailsRef = useRef<HTMLDivElement>(null);
  const { openLoader, closeLoader } = useLoader();
  const { openSnackbar } = useSnackbar();
  const setOpenModal = useSetAtom(openModalAtom);
  const setModalProps = useSetAtom(modalPropsAtom);
  const { state } = useLocation();

  const [tripDetails, setTripDetails] = useState('');
  const setDisableAction = useSetAtom(disableActionsAtom);

  const onClickGenerateTrip = async () => {
    openLoader();
    setIsGeneratingTripDetails(true);
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
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/generate`,
        {
          destinations,
          lengthOfTrip,
          arrivalAirport,
          departureAirport,
          timeOfArrival: dayjs(timeOfArrival).format(TIME_DISPLAY_FORMAT),
          timeOfDeparture: dayjs(timeOfDeparture).format(TIME_DISPLAY_FORMAT),
        },
        { timeout: 60000 }
      );
      setTripDetails(data);
    } catch (error) {
      setDisableAction(false);
      openSnackbar();
      window.console.log(error);
    } finally {
      setIsGeneratingTripDetails(false);
      closeLoader();
    }
  };

  const onClickEdit = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    setModalProps({
      textOne: 'Editing your trip details will remove the generated itinerary.',
      textTwo: 'Proceed to edit?',
      proceedAction: () => {
        setTripDetails('');
        setDisableAction(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setOpenModal(false);
      },
    });
  }, [setDisableAction, setModalProps, setOpenModal]);

  useEffect(() => {
    if (tripDetails && tripDetailsRef.current) {
      resetTripDetails({ tripDetails });
    }
  }, [resetTripDetails, tripDetails]);

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

  useEffect(() => {
    if (!state) {
      return;
    }

    const fetchData = async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/trip/get/${state}`,
          {
            timeout: 10000,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTripDetails(data.tripDetails);

        resetMainForm({
          destinations: data.destinations,
          lengthOfTrip: data.lengthOfTrip,
          arrivalAirport: data.arrivalAirport,
          departureAirport: data.departureAirport,
          // timeOfArrival: data.timeOfArrival,
          // timeOfDeparture: data.timeOfDeparture,
        });

        resetTripDetails({
          tripDetails: data.tripDetails,
        });
      } catch (error) {
        window.console.error('Error fetching trip data:', error);
      }
    };

    fetchData();
  }, [getToken, resetMainForm, resetTripDetails, state]);

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

    navigate('/login');
    setTimeout(() => {
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
    }, 300);
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

    try {
      const token = await getToken();
      await axios.post(
        `${import.meta.env.VITE_API_URL}/trip/create`,
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
        {
          timeout: 10000,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/trips');
    } catch (error) {
      window.console.log(error);
    }
  };

  return (
    <Box>
      <Box sx={classes.root}>
        <FormProvider {...mainFormMethods}>
          <Box sx={classes.form}>
            <form
              noValidate
              onSubmit={handleSubmit(
                tripDetails !== '' ? onClickEdit : onClickGenerateTrip
              )}
            >
              <FormComponent />

              <Box
                sx={{
                  marginTop: '4rem',
                  display: 'flex',
                  justifyContent: 'end',
                }}
              >
                <ButtonComponent
                  disabled={isGeneratingTripDetails}
                  text={tripDetails !== '' ? 'Edit Details' : 'Generate Trip'}
                  type="submit"
                  variant="contained"
                />
              </Box>
            </form>
          </Box>
          <JapanMapComponent />
        </FormProvider>
      </Box>
      <FormProvider {...tripDetailsFormMethods}>
        {tripDetails && (
          <Box sx={{ display: 'grid', padding: '2rem', gap: '2rem' }}>
            <Box ref={tripDetailsRef}>
              <TripDetailsField />
            </Box>
            {isSignedIn && (
              <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <ButtonComponent
                  text="Save Trip Details"
                  type="submit"
                  variant="contained"
                  onClick={saveTrip}
                />
              </Box>
            )}
            {!isSignedIn && (
              <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <ButtonComponent
                  text="Log In to Save Trip Details"
                  type="submit"
                  variant="contained"
                  onClick={loginAndSave}
                />
              </Box>
            )}
          </Box>
        )}
      </FormProvider>
    </Box>
  );
};

export default TripPlannerPage;
