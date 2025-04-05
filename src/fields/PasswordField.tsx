import { FC } from 'react';

import TextFieldBase from './base/TextFieldBase';

const PasswordField: FC = () => {
  return (
    <TextFieldBase
      required
      fieldName="password"
      label="Password"
      type="password"
    />
  );
};

export default PasswordField;
