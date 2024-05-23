import { yupResolver } from "@hookform/resolvers/yup";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserI } from "../../interfaces";

export type RegisterFormType = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone: string;
};

export default function RegisterHook() {
  const navigate = useNavigate();

  const defaultValues: RegisterFormType = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
  };

  const signupSchema = yup.object({
    email: yup
      .string()
      .email("Veuillez renseigner une adresse email valide")
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Veuillez renseigner une adresse email valide"
      )
      .required("Veuillez renseigner une adresse email valide"),
    password: yup
      .string()
      .required("Veuillez renseigner un mot de passe")
      .min(6, "Votre mot de passe doit contenir au moins 6 caractères"),
    confirmPassword: yup
      .string()
      .required("Veuillez confirmer le mot de passe")
      .min(6, "Votre mot de passe doit contenir au moins 6 caractères"),
    name: yup
      .string()
      .required("Le nom doit être renseigné")
      .min(2, "Le nom doit être explicite")
      .max(10, "Le titre doit être succinct"),
    phone: yup.string().required("Veuillez renseigner un numero valide"),
  });

  const {
    register,
    handleSubmit,
    setError,
    watch,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues, resolver: yupResolver(signupSchema) });

  const validatePasswordMatch = (value: string) => {
    const password = watch("password");
    return password === value || "Les mots de passe ne correspondent pas.";
  };
  const { enqueueSnackbar } = useSnackbar();

  async function onSubmit(data: Partial<UserI>) {
    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:3000/users",
        data
      );
      if (response.data) {
        console.log("Response:", response.data);
        enqueueSnackbar("Votre compte a bien ete cree!", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          style: {
            color: "white",
            minWidth: "100%",
          },
        });
        navigate("/login");
        reset(defaultValues);
      }
    } catch (error) {
      const axiosError: AxiosError = error as AxiosError;
      if (axiosError.code === "ERR_BAD_REQUEST") {
        enqueueSnackbar("Cet email est deja utilise.", {
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

      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error;
        if (axiosError.response) {
          console.error("Server responded with:", axiosError.response.status);
          console.error("Response data:", axiosError.response.data);
        } else if (axiosError.request) {
          console.error("No response received");
        } else {
          console.error("Error setting up the request:", axiosError.message);
        }
      } else {
        console.error("Non-Axios error:", error);
      }
    }
  }

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const isPasswordMatch = password === confirmPassword;

  const handleConfirmPasswordChange = () => {
    if (!isPasswordMatch) {
      setError("confirmPassword", {
        type: "manual",
        message: "Les mots de passe ne correspondent pas.",
      });
    }
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    setError,
    watch,
    control,
    errors,
    isSubmitting,
    handleConfirmPasswordChange,
    isPasswordMatch,
    validatePasswordMatch,
  };
}
