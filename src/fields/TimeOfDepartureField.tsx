import { useAtomValue } from 'jotai';
import { FC } from 'react';

import { disableActionsAtom, disableFormAtom } from '../store/atoms';

import TimePickerBase from './base/TimePickerBase';

const TimeOfDepartureField: FC = () => {
  const disableForm = useAtomValue(disableFormAtom);
  const isActionOnGoing = useAtomValue(disableActionsAtom);
  return (
    <TimePickerBase
      disabled={disableForm || isActionOnGoing}
      fieldName="timeOfDeparture"
      label="Time of Departure"
    />
  );
};

export default TimeOfDepartureField;
