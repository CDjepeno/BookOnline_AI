import { yupResolver } from "@hookform/resolvers/yup";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { DefaultValues, useForm } from "react-hook-form";
import * as yup from "yup";
import { AuthContext } from "../../context";
import { BookQueriesKeysEnum, RouterEnum } from "../../enum/enum";
import { UseQueryWorkflowCallback } from "../../request/commons/useQueryWorkflowCallback";
import { createBook } from "../../services/book-services";
import { AddBookInput } from "../../types/book/book.types";
import { AuthContextValue } from "../../types/user/auth.context.value";

export type AddBookFormType = {
  name: string;
  description: string;
  author: string;
  releaseAt: Date;
  imageUrl: string;
};

function AddBookHook() {
  const { user } = useContext(AuthContext) as AuthContextValue;
  const queryClient = new QueryClient();

  const defaultValues: DefaultValues<AddBookFormType> = {
    name: "",
    description: "",
    author: "",
    releaseAt: new Date(),
    imageUrl: "",
  };

  const bookSchema = yup.object({
    name: yup.string().required("Le nom doit être renseigné"),
    description: yup.string().required("Leadescription doit être renseignée"),
    author: yup.string().required("L'author doit être renseigné"),
    releaseAt: yup.date().required("La date de sortie doit être renseignée"),
    imageUrl: yup.string().required("L'imageUrl doit être renseignée"),
  });

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AddBookFormType>({
    defaultValues,
    resolver: yupResolver(bookSchema),
  });

  const { onSuccessCommon, onErrorCommon } = UseQueryWorkflowCallback();

  const userId = user && user.id;
  const { mutateAsync: addBook } = useMutation({
    mutationFn: async (input: AddBookInput) => createBook(input, userId, reset),
    onSuccess: () => {
      onSuccessCommon("Votre livre a bien été crée", RouterEnum.HOME);
      queryClient.invalidateQueries({
        queryKey: [BookQueriesKeysEnum.GetBooks],
      });
    },
    onError: () => {
      onErrorCommon("Une erreur est survenu");
    },
  });

  const submit = async (formInput: AddBookInput) => {
    await addBook(formInput);
  };

  return { register, submit, handleSubmit, isSubmitting, errors, control };
}

export default AddBookHook;
