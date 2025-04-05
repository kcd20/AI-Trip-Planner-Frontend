import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FC } from 'react';

import ArrivalAirportField from '../fields/ArrivalAirportField';
import DepartureAirportField from '../fields/DepartureAirportField';
import DestinationsField from '../fields/DestinationsField';
import LengthOfTripField from '../fields/LengthOfTripField';
import TimeOfArrivalField from '../fields/TimeOfArrivalField';
import TimeOfDepartureField from '../fields/TimeOfDepartureField';

const FormComponent: FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'grid', gap: '3.5rem' }}>
        <DestinationsField />
        <LengthOfTripField />
        <ArrivalAirportField />
        <DepartureAirportField />
        <TimeOfArrivalField />
        <TimeOfDepartureField />
      </Box>
    </LocalizationProvider>
  );
};

export default FormComponent;
