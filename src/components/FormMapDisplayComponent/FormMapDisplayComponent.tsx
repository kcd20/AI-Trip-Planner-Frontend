import Box from '@mui/material/Box';
import { useAtomValue } from 'jotai';
import { CSSProperties, FC } from 'react';
import {
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormReset,
} from 'react-hook-form';

import theme from '../../config/theme';
import useFormMapDisplayComponentLogic from '../../hooks/useFormMapDisplayComponentLogic/useFormMapDisplayComponentLogic';
import { disableActionsAtom, tripDetailsAtom } from '../../store/atoms';
import TravelFormInterface from '../../types/TravelFormInterface';
import ButtonComponent from '../common/ButtonComponent/ButtonComponent';
import FormComponent from '../FormComponent/FormComponent';
import JapanMapComponent from '../JapanMapComponent/JapanMapComponent';

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
  buttonWrapper: {
    marginTop: '3.5rem',
    display: 'flex',
    justifyContent: 'end',
  } as CSSProperties,
} as const;

interface FormMapDisplayComponentProps {
  getMainFormValues: UseFormGetValues<TravelFormInterface>;
  handleSubmit: UseFormHandleSubmit<TravelFormInterface, TravelFormInterface>;
  resetMainForm: UseFormReset<TravelFormInterface>;
  resetTripDetails: UseFormReset<{
    tripDetails?: string;
  }>;
}

const FormMapDisplayComponent: FC<FormMapDisplayComponentProps> = ({
  getMainFormValues,
  handleSubmit,
  resetMainForm,
  resetTripDetails,
}) => {
  const isActionDisabled = useAtomValue(disableActionsAtom);
  const tripDetails = useAtomValue(tripDetailsAtom);

  const { onClickEdit, onClickGenerateTrip } = useFormMapDisplayComponentLogic({
    getMainFormValues,
    resetMainForm,
    resetTripDetails,
  });

  return (
    <Box data-testid="FormMapDisplayComponent" sx={classes.root}>
      <Box sx={classes.form}>
        <form
          noValidate
          onSubmit={handleSubmit(
            tripDetails !== '' ? onClickEdit : onClickGenerateTrip
          )}
        >
          <FormComponent />

          <Box sx={classes.buttonWrapper}>
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
    </Box>
  );
};

export default FormMapDisplayComponent;
