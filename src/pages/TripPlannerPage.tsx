import { useUser } from '@clerk/clerk-react';
import Box from '@mui/system/Box';
import axios from 'axios';
import { useSetAtom } from 'jotai';
import { FC, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ButtonComponent from '../components/ButtonComponent';
import FormComponent from '../components/FormComponent';
import JapanMapComponent from '../components/JapanMapComponent';
import { TRAVEL_FORM_DEFAULT_VALUES } from '../constants';
import TripDetailsField from '../fields/TripDetailsField';
import useLoader from '../hooks/useLoader';
import useSnackbar from '../hooks/useSnackbar';
import {
  disableActionsAtom,
  modalPropsAtom,
  openModalAtom,
} from '../store/atoms';
import TravelFormInterface from '../types/TravelFormInterface';
import generatePrompt from '../utils/generatePrompt';

const TripPlannerPage: FC = () => {
  const { isSignedIn } = useUser();
  const mainFormMethods = useForm<TravelFormInterface>({
    mode: 'all',
    shouldUnregister: true,
    defaultValues: TRAVEL_FORM_DEFAULT_VALUES,
  });
  const { getValues: getMainFormValues, handleSubmit } = mainFormMethods;

  const tripDetailsFormMethods = useForm<{ tripDetails?: string }>({
    mode: 'all',
    shouldUnregister: true,
  });
  const { reset: resetTripDetails } = tripDetailsFormMethods;
  const [isGeneratingTripDetails, setIsGeneratingTripDetails] = useState(false);
  const tripDetailsRef = useRef<HTMLDivElement>(null);
  const { openLoader, closeLoader } = useLoader();
  const { openSnackbar } = useSnackbar();
  const setOpenModal = useSetAtom(openModalAtom);
  const setModalProps = useSetAtom(modalPropsAtom);

  const [tripDetails, setTripDetails] = useState('');
  const setDisableAction = useSetAtom(disableActionsAtom);

  const onClickGenerateTrip = async () => {
    openLoader();
    setIsGeneratingTripDetails(true);
    setDisableAction(true);
    const prompt = generatePrompt(getMainFormValues());
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/trip/generate`,
        {
          prompt,
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

  return (
    <Box>
      <FormProvider {...mainFormMethods}>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ width: '35%', padding: '2rem' }}>
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
        </Box>
      </FormProvider>
      <FormProvider {...tripDetailsFormMethods}>
        {tripDetails && (
          <Box sx={{ display: 'grid', padding: '2rem', gap: '2rem' }}>
            <Box ref={tripDetailsRef}>
              <TripDetailsField />
            </Box>
            {isSignedIn && (
              <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <ButtonComponent
                  disabled={isGeneratingTripDetails}
                  text="Save Trip Details"
                  type="submit"
                  variant="contained"
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
