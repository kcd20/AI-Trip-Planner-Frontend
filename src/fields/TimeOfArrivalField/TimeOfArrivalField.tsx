import { Box } from '@mui/material';
import { useAtomValue } from 'jotai';
import { FC } from 'react';

import { disableActionsAtom, disableFormAtom } from '../../store/atoms';

import TimePickerBase from '../base/TimePickerBase';

const TimeOfArrivalField: FC = () => {
  const disableForm = useAtomValue(disableFormAtom);
  const isActionOnGoing = useAtomValue(disableActionsAtom);
  return (
    <Box data-testid="timeOfArrivalField">
      <TimePickerBase
        disabled={disableForm || isActionOnGoing}
        fieldName="timeOfArrival"
        label="Time of Arrival"
      />
    </Box>
  );
};

export default TimeOfArrivalField;
