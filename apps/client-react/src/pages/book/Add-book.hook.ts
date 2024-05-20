import { yupResolver } from "@hookform/resolvers/yup";
import axios, { AxiosError, AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AuthContext } from "../../context";
import { BookI } from "../../interfaces";
import { AuthContextValue } from "../../types/auth.context.value";

function AddBookHook() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext) as AuthContextValue;
  const defaultValues = {
    name: "",
    description: "",
    author: "",
    releaseAt: "",
    imageUrl: "",
  };

  const bookSchema = yup.object({
    name: yup.string().required("Le nom doit être renseigné"),
    description: yup.string().required("Leadescription doit être renseignée"),
    author: yup.string().required("L'author doit être renseigné"),
    releaseAt: yup.string().required("La releaseAt doit être renseignée"),
    imageUrl: yup.string().required("L'imageUrl doit être renseignée"),
  });

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(bookSchema),
  });

  const submit = async (data: Partial<BookI>) => {
    console.log('Submit formmmmm');
    
    try {
      const storedValue = localStorage.getItem("BookToken");
      const parsedObject = JSON.parse(storedValue as string);
      const response: AxiosResponse = await axios.post(
        "http://localhost:3000/books",
        { ...data, userId: user && user.id },
        {
          headers: {
            Authorization: `Bearer ${parsedObject}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        if (response.data) {
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
          navigate("/");
          reset(defaultValues);
        }

        reset(defaultValues);
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
  };

  return { register, submit, handleSubmit, isSubmitting, errors, control };
}

export default AddBookHook;
