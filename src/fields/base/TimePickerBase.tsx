import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface TextFieldProps {
  label: string;
  fieldName: string;
  required?: boolean;
}

const TimePickerBase = ({
  label,
  fieldName,
  required = false,
}: TextFieldProps): React.ReactNode => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field }) => <TimePicker {...field} label={label} />}
      rules={{ required }}
    />
  );
};

export default TimePickerBase;
