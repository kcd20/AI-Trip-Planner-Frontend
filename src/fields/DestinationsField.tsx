import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CSSProperties, FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { PREFECTURES } from '../constants';
import TravelFormInterface from '../types/TravelFormInterface';

import MultiAutoCompleteFieldBase from './base/MultiAutoCompleteFieldBase';

const classes = {
  error: {
    height: '1rem',
    color: '#ff0000',
    marginTop: '0.5rem',
  } as CSSProperties,
} as const;

const DestinationsField: FC = () => {
  const {
    formState: { errors },
  } = useFormContext<TravelFormInterface>();
  return (
    <Box>
      <MultiAutoCompleteFieldBase
        required
        fieldName="destinations"
        label="Prefectures"
        options={PREFECTURES}
        rules={{ required: true }}
      />
      <Typography sx={classes.error}>
        {errors.destinations && 'Please select at least 1 prefecture.'}
      </Typography>
    </Box>
  );
};

export default DestinationsField;
