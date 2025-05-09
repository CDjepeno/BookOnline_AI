import { UseQueryWorkflowCallback } from "@/request/commons/useQueryWorkflowCallback";
import { approuveBook, disaprouveBook } from "@/services/book.services";
import {
  DeleteBooksResponse,
  ErrorResponse,
} from "@/types/book/response.types";
import { RouterEnum } from "@/types/enum/enum";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

function ModerationHook() {
  const { onSuccessCommon, onErrorCommon } = UseQueryWorkflowCallback();

  const { mutateAsync: approuveBookMutation } = useMutation<
    DeleteBooksResponse,
    AxiosError<unknown>,
    number
  >({
    mutationFn: async (id: number) => await approuveBook(id),

    onSuccess: (res) => {
      onSuccessCommon(res.msg, RouterEnum.HOME);
    },

    onError: (error: Error | AxiosError<unknown>) => {
      let errorMessage =
        "Une erreur est survenue lors de la suppression du livre";

      if ((error as AxiosError<unknown>).isAxiosError) {
        if (
          (error as AxiosError).response &&
          (error as AxiosError).response!.data &&
          ((error as AxiosError).response!.data as ErrorResponse)
        ) {
          errorMessage = ((error as AxiosError).response!.data as ErrorResponse)
            .message;
        }
      }
      onErrorCommon(errorMessage);
    },
  });

  const { mutateAsync: disaprouveBookMutation } = useMutation({
    mutationFn: async (id: number) => await disaprouveBook(id),

    onSuccess: (res) => {
      onSuccessCommon(res.msg, RouterEnum.HOME);
    },

    onError: (error: Error | AxiosError<unknown>) => {
      let errorMessage =
        "Une erreur est survenue lors de la suppression des livre";

      if ((error as AxiosError<unknown>).isAxiosError) {
        if (
          (error as AxiosError).response &&
          (error as AxiosError).response!.data &&
          ((error as AxiosError).response!.data as ErrorResponse)
        ) {
          errorMessage = ((error as AxiosError).response!.data as ErrorResponse)
            .message;
        }
      }

      onErrorCommon(errorMessage);
    },
  });

  return {
    approuveBookMutation,
    disaprouveBookMutation,
  };
}

export default ModerationHook;
