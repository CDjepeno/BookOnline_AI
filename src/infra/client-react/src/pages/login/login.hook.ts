import { yupResolver } from "@hookform/resolvers/yup";
import axios, { AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AuthInput } from "../../types";

export default function LoginHook() {
  const navigate = useNavigate();
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

  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm({ defaultValues, resolver: yupResolver(validationSchema) });

  async function onSubmit(data: AuthInput) {
    try {
      clearErrors();
      const response: AxiosResponse = await axios.post(
        "http://localhost:3000/auth/login",
        data
      );
      console.log(response);
      if (response.data) {
        console.log("Response:", response.data);
        localStorage.setItem("BookToken", response.data.token);
        navigate("/");
      }
    } catch (error) {
      enqueueSnackbar("Une erreur est survenue!", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        style: {
          color: "white",
          textAlign: "center",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      });
    }
  }

  return {
    handleSubmit,
    register,
    onSubmit,
    errors,
    isSubmitting,
  };
}
