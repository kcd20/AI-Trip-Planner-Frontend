import Box from '@mui/system/Box';
import { useAtomValue } from 'jotai';
import { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import FormMapDisplayComponent from '../../components/FormMapDisplayComponent/FormMapDisplayComponent';
import TripDetailsComponent from '../../components/TripDetailsComponent/TripDetailsComponent';
import { TRAVEL_FORM_DEFAULT_VALUES } from '../../constants';
import { tripDetailsAtom } from '../../store/atoms';
import TravelFormInterface from '../../types/TravelFormInterface';

const TripPlannerPage: FC = () => {
  const tripDetails = useAtomValue(tripDetailsAtom);

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
  const { reset: resetTripDetails } = tripDetailsFormMethods;

  useEffect(() => {
    sessionStorage.removeItem('savedTrip');
  }, []);

  return (
    <Box>
      <Box>
        <FormProvider {...mainFormMethods}>
          <FormMapDisplayComponent
            getMainFormValues={getMainFormValues}
            handleSubmit={handleSubmit}
            resetMainForm={resetMainForm}
            resetTripDetails={resetTripDetails}
          />
        </FormProvider>
      </Box>
      <FormProvider {...tripDetailsFormMethods}>
        {tripDetails && (
          <TripDetailsComponent getMainFormValues={getMainFormValues} />
        )}
      </FormProvider>
    </Box>
  );
};

export default TripPlannerPage;
