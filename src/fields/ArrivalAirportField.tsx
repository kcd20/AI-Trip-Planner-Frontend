import { useAtomValue } from 'jotai';
import { FC } from 'react';

import { AIRPORTS } from '../constants';
import { disableActionsAtom, disableFormAtom } from '../store/atoms';

import GroupSelectBase from './base/GroupSelectBase';

const ArrivalAirportField: FC = () => {
  const disableForm = useAtomValue(disableFormAtom);
  const isActionOnGoing = useAtomValue(disableActionsAtom);
  return (
    <GroupSelectBase
      disabled={disableForm || isActionOnGoing}
      fieldName="arrivalAirport"
      label="Arrival Airport"
      options={AIRPORTS}
    />
  );
};

export default ArrivalAirportField;
