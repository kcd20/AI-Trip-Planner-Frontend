import { FC } from 'react';

import { PREFECTURES } from '../constants';

import MultiAutoCompleteFieldBase from './base/MultiAutoCompleteFieldBase';

const DestinationsField: FC = () => {
  return (
    <MultiAutoCompleteFieldBase
      required
      fieldName="destinations"
      label="Prefectures"
      options={PREFECTURES}
    />
  );
};

export default DestinationsField;
