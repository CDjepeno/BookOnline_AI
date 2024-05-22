import TextField, { TextFieldProps } from "@mui/material/TextField";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

interface FormInputProps<T extends FieldValues>
  extends Omit<TextFieldProps, "name" | "label" | "control" | "errors"> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  errors: FieldErrors<T>;
  type?: string;
  onblur?: () => void;
}

function FormInput<T extends FieldValues>({
  name,
  label,
  control,
  errors,
  type = "text",
  onblur,
  ...props
}: FormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          {...props}
          label={label}
          fullWidth
          required
          type={type}
          error={!!errors[name]}
          helperText={errors[name] ? (errors[name]?.message as string) : null}
          onBlur={onblur}
        />
      )}
    />
  );
}

export default FormInput;
