import { TextField } from '@mui/material';
import React from 'react';
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';

interface TextFieldProps {
  label: string;
  fieldName: string;
  required?: boolean;
  type?: string;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
      >
    | undefined;
}

const TextFieldBase = ({
  label,
  fieldName,
  required = false,
  type = 'text',
  rules,
}: TextFieldProps): React.ReactNode => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          required={required}
          sx={{
            width: '100%',
            '& input:-webkit-autofill': {
              transition: 'background-color 600000s 0s, color 600000s 0s',
            },
          }}
          type={type}
          variant="outlined"
        />
      )}
      rules={rules}
    />
  );
};

export default TextFieldBase;
