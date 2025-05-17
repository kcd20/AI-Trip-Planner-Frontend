import { useUser } from '@clerk/clerk-react';
import Box from '@mui/system/Box';
import { useAtomValue } from 'jotai';
import { CSSProperties, FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ButtonComponent from '../components/common/ButtonComponent/ButtonComponent';
import FormComponent from '../components/FormComponent';
import JapanMapComponent from '../components/JapanMapComponent';
import theme from '../config/theme';
import { TRAVEL_FORM_DEFAULT_VALUES } from '../constants';
import TripDetailsField from '../fields/TripDetailsField';
import useTripPlannerPageLogic from '../hooks/useTripPlannerPageLogic';
import { disableActionsAtom } from '../store/atoms';
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
  const { isSignedIn } = useUser();
  const isActionDisabled = useAtomValue(disableActionsAtom);

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

  const {
    onClickGenerateTrip,
    tripDetails,
    saveTrip,
    tripDetailsRef,
    loginAndSave,
    onClickEdit,
  } = useTripPlannerPageLogic({
    getMainFormValues,
    getTripDetailsValues,
    resetMainForm,
    resetTripDetails,
  });

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
                  disabled={isActionDisabled}
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
