import { useAtomValue } from 'jotai';
import { FC } from 'react';

import { disableActionsAtom } from '../store/atoms';

import TimePickerBase from './base/TimePickerBase';

const TimeOfArrivalField: FC = () => {
  const disabled = useAtomValue(disableActionsAtom);
  return (
    <TimePickerBase
      disabled={disabled}
      fieldName="timeOfArrival"
      label="Time of Arrival"
    />
  );
};

export default TimeOfArrivalField;
