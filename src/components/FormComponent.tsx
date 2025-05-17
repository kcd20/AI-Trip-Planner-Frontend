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
    <Box sx={{ display: 'grid', gap: '2rem' }}>
      <Box sx={{ display: 'grid', gap: '2rem' }}>
        <DestinationsField />
        <LengthOfTripField />
      </Box>
      <Box sx={{ display: 'grid', gap: '3.5rem' }}>
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
