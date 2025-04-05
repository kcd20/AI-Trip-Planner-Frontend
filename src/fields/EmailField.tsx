import { FC } from 'react';

import TextFieldBase from './base/TextFieldBase';

const EmailField: FC = () => {
  return (
    <TextFieldBase required fieldName="email" label="Email" type="email" />
  );
};

export default EmailField;
