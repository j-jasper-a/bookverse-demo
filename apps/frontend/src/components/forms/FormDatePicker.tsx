import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Controller, Control, Path, FieldValues } from "react-hook-form";

type FormDatePicker<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
};

const FormDatePicker = <T extends FieldValues>({
  control,
  label,
  name,
}: FormDatePicker<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            {...field}
            disableFuture
            label={label}
            format="DD MMMM YYYY"
            value={field.value ? dayjs(field.value) : null}
            onChange={(value) => field.onChange(value?.toISOString() ?? null)}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default FormDatePicker;
