import { useAtomValue } from 'jotai';
import { FC } from 'react';

import { disableActionsAtom } from '../store/atoms';

import TimePickerBase from './base/TimePickerBase';

const TimeOfDepartureField: FC = () => {
  const disabled = useAtomValue(disableActionsAtom);
  return (
    <TimePickerBase
      disabled={disabled}
      fieldName="timeOfDeparture"
      label="Time of Departure"
    />
  );
};

export default TimeOfDepartureField;
