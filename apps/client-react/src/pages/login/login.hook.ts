import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AuthContext } from "../../context";
import { UseQueryWorkflowCallback } from "../../request/commons/useQueryWorkflowCallback";
import { Route } from "../../request/route-http/route-http";
import { AuthInput } from "../../types";
import { AuthContextValue } from "../../types/auth.context.value";

export type LoginFormType = {
  email: string;
  password: string;
};

export default function LoginHook() {
  const { signin } = useContext(AuthContext) as AuthContextValue;

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Il faut préciser votre email")
      .email("l'email n'est pas valide"),
    password: yup
      .string()
      .required("Il faut préciser votre mot de passe")
      .min(6, "Mot de passe trop court"),
  });

  const defaultValues: LoginFormType = {
    email: "",
    password: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    clearErrors,
    control,
  } = useForm({ defaultValues, resolver: yupResolver(validationSchema) });

  const { onErrorCommon } = UseQueryWorkflowCallback();
  const navigate = useNavigate();

  const { mutateAsync: onSubmit } = useMutation({
    mutationFn: async (input: AuthInput) => signin(input),
    onError: (error) => {
      if (
        (error as AxiosError).response &&
        (error as AxiosError).response!.status === 401
      ) {
        onErrorCommon("Mauvais email/mot de passe!");
        clearErrors();
      }
    },
    onSuccess: async () => {
      navigate(Route.HOME);
    },
  });

  return {
    handleSubmit,
    register,
    onSubmit,
    errors,
    isSubmitting,
    control,
  };
}
