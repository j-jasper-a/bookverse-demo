import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type FormTextInput<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
} & TextFieldProps;

const FormTextInput = <T extends FieldValues>({
  name,
  control,
  ...props
}: FormTextInput<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <TextField
        {...field}
        {...props}
        fullWidth
        error={!!error}
        helperText={error?.message || props.helperText}
      />
    )}
  />
);

export default FormTextInput;
