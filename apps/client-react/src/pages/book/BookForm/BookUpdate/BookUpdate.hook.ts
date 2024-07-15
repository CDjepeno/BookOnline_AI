import { useForm } from "react-hook-form";
import { UpdateBookFormType } from "../../../../types/book/book.types";

// interface ErrorResponse {
//   message: string;
// }

function BookUpdateHook() {
  // const queryClient = useQueryClient();
  // const { onSuccessCommon, onErrorCommon } = UseQueryWorkflowCallback();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<UpdateBookFormType>();

  console.log("update hookkkkk");
  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: 'chapters', // Suppose we have a dynamic array of 'chapters'
  // });

  // const { mutateAsync: updateBookMutation } = useMutation<
  //   UpdateBookResponse,
  //   AxiosError<unknown>,
  //   { id: string; data: FormData }
  // >({
  //   mutationFn: async ({ id, data }) => updateBook(id, data),

  //   onSuccess: () => {
  //     onSuccessCommon("Le livre a été mis à jour avec succès");
  //     queryClient.invalidateQueries({
  //       queryKey: [BookQueriesKeysEnum.BooksUser],
  //     });
  //   },

  //   onError: (error: Error | AxiosError<unknown>) => {
  //     let errorMessage =
  //       "Une erreur est survenue lors de la mise à jour du livre";

  //     if ((error as AxiosError<unknown>).isAxiosError) {
  //       if (
  //         (error as AxiosError).response &&
  //         (error as AxiosError).response!.data &&
  //         ((error as AxiosError).response!.data as ErrorResponse)
  //       ) {
  //         errorMessage = ((error as AxiosError).response!.data as ErrorResponse)
  //           .message;
  //       }
  //     }

  //     onErrorCommon(errorMessage);
  //   },
  // });

  const submit = async (data: UpdateBookFormType) => {
    console.log("data update", data);
    // try {

    //   await updateBookMutation(data);
    // }
    // } catch (error) {
    //   console.error("error updating book", error);
    // }
  };

  return {
    register,
    submit,
    handleSubmit,
    isSubmitting,
    getValues,
    errors,
    control,
  };
}

export default BookUpdateHook;
