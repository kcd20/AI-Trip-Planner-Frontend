import { useAtomValue } from 'jotai';
import { FC } from 'react';

import { AIRPORTS } from '../constants';
import { disableActionsAtom } from '../store/atoms';

import GroupSelectFieldBase from './base/GroupSelectFieldBase';

const DepartureAirportField: FC = () => {
  const disabled = useAtomValue(disableActionsAtom);
  return (
    <GroupSelectFieldBase
      disabled={disabled}
      fieldName="departureAirport"
      label="Departure Airport"
      options={AIRPORTS}
    />
  );
};

export default DepartureAirportField;
