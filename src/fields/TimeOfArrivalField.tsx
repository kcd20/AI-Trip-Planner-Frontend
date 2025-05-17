import { useAtomValue } from 'jotai';
import { FC } from 'react';

import { disableActionsAtom, disableFormAtom } from '../store/atoms';

import TimePickerBase from './base/TimePickerBase';

const TimeOfArrivalField: FC = () => {
  const disableForm = useAtomValue(disableFormAtom);
  const isActionOnGoing = useAtomValue(disableActionsAtom);
  return (
    <TimePickerBase
      disabled={disableForm || isActionOnGoing}
      fieldName="timeOfArrival"
      label="Time of Arrival"
    />
  );
};

export default TimeOfArrivalField;
