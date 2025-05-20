import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CSSProperties, FC } from 'react';

import ArrivalAirportField from '../../fields/ArrivalAirportField/ArrivalAirportField';
import DepartureAirportField from '../../fields/DepartureAirportField';
import DestinationsField from '../../fields/DestinationsField';
import LengthOfTripField from '../../fields/LengthOfTripField';
import TimeOfArrivalField from '../../fields/TimeOfArrivalField';
import TimeOfDepartureField from '../../fields/TimeOfDepartureField';

const classes = {
  root: {
    display: 'grid',
    gap: '2rem',
  } as CSSProperties,
  mandatoryFields: { display: 'grid', gap: '2rem' } as CSSProperties,
  optionalFields: { display: 'grid', gap: '3.5rem' } as CSSProperties,
} as const;

const FormComponent: FC = () => {
  return (
    <Box sx={classes.root}>
      <Box sx={classes.mandatoryFields}>
        <DestinationsField />
        <LengthOfTripField />
      </Box>
      <Box sx={classes.optionalFields}>
        <ArrivalAirportField />
        <DepartureAirportField />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeOfArrivalField />
          <TimeOfDepartureField />
        </LocalizationProvider>
      </Box>
    </Box>
  );
};

export default FormComponent;
