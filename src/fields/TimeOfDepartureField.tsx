import { FC } from 'react';

import TimePickerBase from './base/TimePickerBase';

const TimeOfDepartureField: FC = () => {
  return (
    <TimePickerBase fieldName="timeOfDeparture" label="Time of Departure" />
  );
};

export default TimeOfDepartureField;
