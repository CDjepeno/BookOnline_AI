import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Control, Controller, FieldErrors } from 'react-hook-form';

interface FormInputProps extends Omit<TextFieldProps, 'name' | 'label' | 'control' | 'errors'> {
  name: string;
  label: string;
  control: Control<any>;
  errors: FieldErrors;
  type?: string;
  onblur?:any
}


function FormInput({ name, label, control, errors, type = 'text', onblur, ...props }:FormInputProps) {
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