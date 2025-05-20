import { Box } from '@mui/material';
import { useAtomValue } from 'jotai';
import { FC } from 'react';

import { AIRPORTS } from '../../constants';
import { disableActionsAtom, disableFormAtom } from '../../store/atoms';
import GroupSelectBase from '../base/GroupSelectBase';

const ArrivalAirportField: FC = () => {
  const disableForm = useAtomValue(disableFormAtom);
  const isActionOnGoing = useAtomValue(disableActionsAtom);
  return (
    <Box data-testid="arrivalAirportField">
      <GroupSelectBase
        data-testid="arrivalAirportField"
        disabled={disableForm || isActionOnGoing}
        fieldName="arrivalAirport"
        label="Arrival Airport"
        options={AIRPORTS}
      />
    </Box>
  );
};

export default ArrivalAirportField;
