import { AxiosResponse } from "axios";
import { MethodHttpEnum } from "../enum/enum";
import { UseRequestApi } from "../request/commons/useApiRequest";
import { BOOKS_ROUTE, BOOK_ROUTE } from "../request/route-http/route-http";
import { AddBookResponse } from "../types/book/book.types";

export const getBooks = async (): Promise<AddBookResponse[]> => {
  return await UseRequestApi<AddBookResponse[], null>({
    path: BOOKS_ROUTE,
    method: MethodHttpEnum.GET,
    includeAuthorizationHeader: false,
  });
};

export const createBook = async (
  formData: FormData,
  userId: number | null,
  reset: () => void
): Promise<AxiosResponse> => {
  if (userId) {
    formData.append("userId", userId.toString());
  }

  const response: AxiosResponse = await UseRequestApi({
    method: MethodHttpEnum.POST,
    path: BOOK_ROUTE,
    params: formData,
    includeAuthorizationHeader: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  reset();
  return response;
};
