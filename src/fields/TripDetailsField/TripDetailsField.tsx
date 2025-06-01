import { FC } from 'react';

import TextAreaBase from '../base/TextAreaBase';

const TripDetailsField: FC = () => {
  return (
    <TextAreaBase
      data-testid="tripDetailsField"
      fieldName="tripDetails"
      label="Trip Details"
    />
  );
};

export default TripDetailsField;
