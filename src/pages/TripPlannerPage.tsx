import Box from '@mui/system/Box';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ButtonComponent from '../components/ButtonComponent';
import FormComponent from '../components/FormComponent';
import JapanMapComponent from '../components/JapanMapComponent';
import { TRAVEL_FORM_DEFAULT_VALUES } from '../constants';
import TripDetailsField from '../fields/TripDetailsField';
import TravelFormInterface from '../types/TravelFormInterface';
import generatePrompt from '../utils/generatePrompt';

const TripPlannerPage: FC = () => {
  const methods = useForm<TravelFormInterface>({
    mode: 'all',
    shouldUnregister: true,
    defaultValues: TRAVEL_FORM_DEFAULT_VALUES,
  });
  const { getValues, reset } = methods;
  const [isGeneratingTripDetails, setIsGeneratingTripDetails] = useState(false);
  const [tripDetails, setTripDetails] = useState('');

  const onClickGenerateTrip = async () => {
    setIsGeneratingTripDetails(true);
    const prompt = generatePrompt(getValues());
    try {
      const { data } = await axios.post('http://localhost:3000/trip/generate', {
        prompt,
      });
      setTripDetails(data);
    } catch (error) {
      window.console.log(error);
    }
  };

  useEffect(() => {
    reset({ tripDetails });
  }, [reset, tripDetails]);

  return (
    <FormProvider {...methods}>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '35%', padding: '2rem' }}>
          <FormComponent />
          <Box
            sx={{ marginTop: '4rem', display: 'flex', justifyContent: 'end' }}
          >
            <ButtonComponent
              disabled={isGeneratingTripDetails}
              text="Generate Trip"
              variant="contained"
              onClick={onClickGenerateTrip}
            />
          </Box>
        </Box>
        <JapanMapComponent />
      </Box>
      <TripDetailsField />
    </FormProvider>
  );
};

export default TripPlannerPage;
