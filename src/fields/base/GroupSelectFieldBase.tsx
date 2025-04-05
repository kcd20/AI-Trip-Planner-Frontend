import { FormControl, InputLabel } from '@mui/material';
import Select from '@mui/material/Select';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { OptionsGroupType } from '../../types/OptionsGroupType';

interface MultiSelectFieldProps {
  label: string;
  fieldName: string;
  options: OptionsGroupType;
  required?: boolean;
}

const GroupSelectFieldBase = ({
  label,
  fieldName,
  options,
  required = false,
}: MultiSelectFieldProps): React.ReactNode => {
  const { control } = useFormContext();
  const clearOption = <option key="none" aria-label="None" value="" />;
  const allOptions = options.map((group) =>
    Object.entries(group).map((groupItem) => (
      <optgroup key={groupItem[0]} label={groupItem[0]}>
        {groupItem[1].map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </optgroup>
    ))
  );
  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id={label}>{label}</InputLabel>
          <Select native label={label} {...field} required={required}>
            {[clearOption, ...allOptions]}
          </Select>
        </FormControl>
      )}
      rules={{ required }}
    />
  );
};

export default GroupSelectFieldBase;
