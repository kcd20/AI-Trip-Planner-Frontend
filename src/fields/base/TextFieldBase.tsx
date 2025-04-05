import { TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface TextFieldProps {
  label: string;
  fieldName: string;
  required?: boolean;
  type?: string;
}

const TextFieldBase = ({
  label,
  fieldName,
  required = false,
  type = 'text',
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
          sx={{ width: '100%' }}
          type={type}
          variant="outlined"
        />
      )}
      rules={{ required }}
    />
  );
};

export default TextFieldBase;
