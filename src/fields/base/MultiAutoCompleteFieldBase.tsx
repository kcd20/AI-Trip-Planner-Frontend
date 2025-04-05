import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';

interface MultiSelectFieldProps {
  label: string;
  fieldName: string;
  options: string[];
  required?: boolean;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
      >
    | undefined;
}

const MultiAutoCompleteFieldBase = ({
  label,
  fieldName,
  options,
  required = true,
  rules,
}: MultiSelectFieldProps): React.ReactNode => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field }) => (
        <Autocomplete
          {...field}
          filterSelectedOptions
          multiple
          getOptionLabel={(option) => option}
          options={options}
          renderInput={(params) => (
            <TextField {...params} label={label} required={required} />
          )}
          onChange={(_event, value) => field.onChange(value)}
        />
      )}
      rules={rules}
    />
  );
};

export default MultiAutoCompleteFieldBase;
