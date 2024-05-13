import { yupResolver } from "@hookform/resolvers/yup";
import axios, { AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { BookI } from "../../interfaces";

function AddBookHook() {
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
    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:3000/books",
        data
      );
      if (response.data) {
        console.log("Response:", response.data);

        reset(defaultValues);
      }
    } catch (error) {
      console.log("Connecte toi pour ajouter un livre");
    }
  };

  return { register, submit, handleSubmit, isSubmitting, errors, control };
}

export default AddBookHook;
