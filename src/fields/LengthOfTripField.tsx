import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CSSProperties, FC } from 'react';
import { useFormContext } from 'react-hook-form';

import TravelFormInterface from '../types/TravelFormInterface';

import TextFieldBase from './base/TextFieldBase';

const classes = {
  error: {
    height: '1rem',
    color: '#ff0000',
    marginTop: '0.5rem',
  } as CSSProperties,
} as const;

const LengthOfTripField: FC = () => {
  const {
    formState: { errors },
  } = useFormContext<TravelFormInterface>();

  const validateTripLength = (input: string): boolean | string => {
    if (Number(input) > 31) {
      return 'Please enter a number that is 31 or less';
    }
    if (Number(input) > 0) {
      return true;
    }
    return 'Please enter only positive numbers.';
  };

  return (
    <Box>
      <TextFieldBase
        required
        fieldName="lengthOfTrip"
        label="Length of Trip (days)"
        rules={{ required: true, validate: validateTripLength }}
      />
      <Typography sx={classes.error}>
        {errors.lengthOfTrip &&
          (errors.lengthOfTrip.message ||
            'Please enter the length of your trip')}
      </Typography>
    </Box>
  );
};

export default LengthOfTripField;
