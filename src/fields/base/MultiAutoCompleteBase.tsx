import { Autocomplete, TextField } from '@mui/material';
import { FC } from 'react';
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
  disabled?: boolean;
}

const MultiAutoCompleteBase: FC<MultiSelectFieldProps> = ({
  label,
  fieldName,
  options,
  required = false,
  rules,
  disabled = false,
}) => {
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
          disabled={disabled}
          getOptionLabel={(option) => option}
          options={options}
          renderInput={(params) => (
            <TextField {...params} label={label} required={required} />
          )}
          sx={{ width: '100%' }}
          onChange={(_event, value) => field.onChange(value)}
        />
      )}
      rules={rules}
    />
  );
};

export default MultiAutoCompleteBase;
