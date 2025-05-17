import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAtomValue } from 'jotai';
import { CSSProperties, FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { PREFECTURES } from '../constants';
import { disableActionsAtom, disableFormAtom } from '../store/atoms';
import TravelFormInterface from '../types/TravelFormInterface';

import MultiAutoCompleteBase from './base/MultiAutoCompleteBase';

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
  const disableForm = useAtomValue(disableFormAtom);
  const isActionOnGoing = useAtomValue(disableActionsAtom);
  return (
    <Box>
      <MultiAutoCompleteBase
        required
        disabled={disableForm || isActionOnGoing}
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
