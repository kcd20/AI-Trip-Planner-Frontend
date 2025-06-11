import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/system/Box';
import { useAtomValue } from 'jotai';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import FormMapDisplayComponent from '../../components/FormMapDisplayComponent/FormMapDisplayComponent';
import TripDetailsComponent from '../../components/TripDetailsComponent/TripDetailsComponent';
import { TravelForm, travelFormSchema } from '../../config/formSchema';
import { TRAVEL_FORM_DEFAULT_VALUES } from '../../constants';
import { tripDetailsAtom } from '../../store/atoms';

const TripPlannerPage: FC = () => {
  const tripDetails = useAtomValue(tripDetailsAtom);

  const mainFormMethods = useForm<TravelForm>({
    mode: 'all',
    shouldUnregister: true,
    defaultValues: TRAVEL_FORM_DEFAULT_VALUES,
    resolver: zodResolver(travelFormSchema),
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

  return (
    <Box>
      <FormProvider {...mainFormMethods}>
        <FormMapDisplayComponent
          getMainFormValues={getMainFormValues}
          handleSubmit={handleSubmit}
          resetMainForm={resetMainForm}
          resetTripDetails={resetTripDetails}
        />
      </FormProvider>
      <FormProvider {...tripDetailsFormMethods}>
        {tripDetails && (
          <TripDetailsComponent getMainFormValues={getMainFormValues} />
        )}
      </FormProvider>
    </Box>
  );
};

export default TripPlannerPage;
