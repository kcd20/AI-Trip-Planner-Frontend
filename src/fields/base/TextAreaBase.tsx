import { TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface TextFieldProps {
  label: string;
  fieldName: string;
  required?: boolean;
}

const TextAreaBase = ({
  label,
  fieldName,
  required = false,
}: TextFieldProps): React.ReactNode => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field }) => (
        <TextField
          {...field}
          multiline
          label={label}
          required={required}
          sx={{ width: '100%' }}
          variant="outlined"
        />
      )}
      rules={{ required }}
    />
  );
};

export default TextAreaBase;
