import { Autocomplete, TextField } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type Option = {
  value: string;
  label: {
    en: string;
    de: string;
  };
};

type FormMultiSelect<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  options: Option[];
};

const FormMultiSelect = <T extends FieldValues>({
  name,
  label,
  control,
  options,
}: FormMultiSelect<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Autocomplete
          {...field}
          multiple
          fullWidth
          options={options}
          getOptionLabel={(option) => option.label.en}
          value={
            options.filter((genre) => field.value?.includes(genre.value)) || []
          }
          onChange={(_, value) => field.onChange(value.map((v) => v.value))}
          renderInput={(params) => <TextField {...params} label={label} />}
        />
      )}
    />
  );
};

export default FormMultiSelect;
