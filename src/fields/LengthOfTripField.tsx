import { FC } from 'react';

import TextFieldBase from './base/TextFieldBase';

const LengthOfTripField: FC = () => {
  return (
    <TextFieldBase
      required
      fieldName="lengthOfTrip"
      label="Length of Trip (days)"
      type="number"
    />
  );
};

export default LengthOfTripField;
