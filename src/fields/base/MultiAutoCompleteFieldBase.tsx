import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface MultiSelectFieldProps {
  label: string;
  fieldName: string;
  options: string[];
  required?: boolean;
}

const MultiAutoCompleteFieldBase = ({
  label,
  fieldName,
  options,
  required = true,
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
          renderInput={(params) => <TextField {...params} label={label} />}
          onChange={(_event, value) => field.onChange(value)}
        />
      )}
      rules={{ required }}
    />
  );
};

export default MultiAutoCompleteFieldBase;
