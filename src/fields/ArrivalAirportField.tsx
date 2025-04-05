import { FC } from 'react';

import { AIRPORTS } from '../constants';

import GroupSelectFieldBase from './base/GroupSelectFieldBase';

const ArrivalAirportField: FC = () => {
  return (
    <GroupSelectFieldBase
      required
      fieldName="arrivalAirport"
      label="Arrival Airport"
      options={AIRPORTS}
    />
  );
};

export default ArrivalAirportField;
