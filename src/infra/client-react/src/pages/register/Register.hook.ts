import { useForm } from "react-hook-form";

export default function RegisterHook() {
  const form = useForm();

  return {
    form,
  };
}
