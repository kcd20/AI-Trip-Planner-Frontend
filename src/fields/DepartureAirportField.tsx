import { FC } from 'react';

import { AIRPORTS } from '../constants';

import GroupSelectFieldBase from './base/GroupSelectFieldBase';

const DepartureAirportField: FC = () => {
  return (
    <GroupSelectFieldBase
      fieldName="departureAirport"
      label="Departure Airport"
      options={AIRPORTS}
    />
  );
};

export default DepartureAirportField;
