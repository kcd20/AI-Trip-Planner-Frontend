import { useAtomValue } from 'jotai';
import { FC } from 'react';

import { AIRPORTS } from '../constants';
import { disableActionsAtom } from '../store/atoms';

import GroupSelectFieldBase from './base/GroupSelectFieldBase';

const ArrivalAirportField: FC = () => {
  const disabled = useAtomValue(disableActionsAtom);
  return (
    <GroupSelectFieldBase
      disabled={disabled}
      fieldName="arrivalAirport"
      label="Arrival Airport"
      options={AIRPORTS}
    />
  );
};

export default ArrivalAirportField;
