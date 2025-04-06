import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface TextFieldProps {
  label: string;
  fieldName: string;
  required?: boolean;
  disabled?: boolean;
}

const TimePickerBase = ({
  label,
  fieldName,
  required = false,
  disabled = false,
}: TextFieldProps): React.ReactNode => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field }) => (
        <TimePicker
          {...field}
          disabled={disabled}
          label={label}
          sx={{ width: '100%' }}
        />
      )}
      rules={{ required }}
    />
  );
};

export default TimePickerBase;
