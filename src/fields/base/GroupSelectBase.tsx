import { FormControl, InputLabel } from '@mui/material';
import Select from '@mui/material/Select';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { OptionsGroupType } from '../../types/OptionsGroupType';

interface MultiSelectFieldProps {
  label: string;
  fieldName: string;
  options: OptionsGroupType;
  required?: boolean;
  disabled?: boolean;
}

const GroupSelectBase: FC<MultiSelectFieldProps> = ({
  label,
  fieldName,
  options,
  required = false,
  disabled = false,
}) => {
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
          <InputLabel disabled={disabled} htmlFor={fieldName} id={label}>
            {label}
          </InputLabel>
          <Select
            native
            label={label}
            {...field}
            disabled={disabled}
            id={fieldName}
            required={required}
          >
            {[clearOption, ...allOptions]}
          </Select>
        </FormControl>
      )}
      rules={{ required }}
    />
  );
};

export default GroupSelectBase;
