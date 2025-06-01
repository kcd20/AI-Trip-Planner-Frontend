import { Box } from '@mui/material';
import { useAtomValue } from 'jotai';
import { FC } from 'react';

import { disableActionsAtom, disableFormAtom } from '../../store/atoms';
import TimePickerBase from '../base/TimePickerBase';

const TimeOfDepartureField: FC = () => {
  const disableForm = useAtomValue(disableFormAtom);
  const isActionOnGoing = useAtomValue(disableActionsAtom);
  return (
    <Box data-testid="timeOfDepartureField">
      <TimePickerBase
        data-testid="timeOfDepartureField"
        disabled={disableForm || isActionOnGoing}
        fieldName="timeOfDeparture"
        label="Time of Departure"
      />
    </Box>
  );
};

export default TimeOfDepartureField;
