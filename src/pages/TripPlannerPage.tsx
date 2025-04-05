import { useUser } from '@clerk/clerk-react';
import Box from '@mui/system/Box';
import axios from 'axios';
import { FC, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ButtonComponent from '../components/ButtonComponent';
import FormComponent from '../components/FormComponent';
import JapanMapComponent from '../components/JapanMapComponent';
import { TRAVEL_FORM_DEFAULT_VALUES } from '../constants';
import TripDetailsField from '../fields/TripDetailsField';
import useLoader from '../hooks/useLoader';
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
  const { getValues: getTripDetailsValues, reset: resetTripDetails } =
    tripDetailsFormMethods;
  const [isGeneratingTripDetails, setIsGeneratingTripDetails] = useState(false);
  const tripDetailsRef = useRef<HTMLDivElement>(null);
  const { openLoader, closeLoader } = useLoader();
  const [tripDetails, setTripDetails] = useState('');

  const onClickGenerateTrip = async () => {
    openLoader();
    setIsGeneratingTripDetails(true);
    const prompt = generatePrompt(getMainFormValues());
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/trip/generate`,
        {
          prompt,
        },
        { timeout: 30000 }
      );
      setTripDetails(data);
      setIsGeneratingTripDetails(false);
    } catch (error) {
      setIsGeneratingTripDetails(false);
      window.console.log(error);
    } finally {
      closeLoader();
    }
  };

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
            <form noValidate onSubmit={handleSubmit(onClickGenerateTrip)}>
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
                  text="Generate Trip"
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
