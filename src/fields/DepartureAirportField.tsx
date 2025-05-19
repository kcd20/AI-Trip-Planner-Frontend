import { Box } from '@mui/system';
import { useAtomValue } from 'jotai';
import { FC } from 'react';

import { AIRPORTS } from '../constants';
import { disableActionsAtom, disableFormAtom } from '../store/atoms';

import GroupSelectBase from './base/GroupSelectBase';

const DepartureAirportField: FC = () => {
  const disableForm = useAtomValue(disableFormAtom);
  const isActionOnGoing = useAtomValue(disableActionsAtom);
  return (
    <Box data-testid="departureAirportField">
      <GroupSelectBase
        disabled={disableForm || isActionOnGoing}
        fieldName="departureAirport"
        label="Departure Airport"
        options={AIRPORTS}
      />
    </Box>
  );
};

export default DepartureAirportField;
