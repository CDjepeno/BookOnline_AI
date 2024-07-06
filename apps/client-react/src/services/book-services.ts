import { AxiosResponse } from "axios";
import { MethodHttpEnum } from "../enum/enum";
import { UseRequestApi } from "../request/commons/useApiRequest";
import {
  BOOKS_ROUTE,
  BOOK_ROUTE,
  BOOK_USER_ROUTE,
  getBookRoute,
} from "../request/route-http/route-http";
import { GetBookResponse, GetBooksResponse } from "../types/book/book.types";

export const getBook = async (id: string): Promise<GetBookResponse> => {
  return await UseRequestApi<GetBookResponse, { id: string }>({
    path: getBookRoute(id),
    method: MethodHttpEnum.GET,
    params: { id },
    includeAuthorizationHeader: false,
  });
};

export const getBooks = async (): Promise<GetBooksResponse[]> => {
  return await UseRequestApi<GetBooksResponse[], null>({
    path: BOOKS_ROUTE,
    method: MethodHttpEnum.GET,
    includeAuthorizationHeader: false,
  });
};

export const getBooksByUser = async (
  userId: string
): Promise<GetBooksResponse[]> => {
  return await UseRequestApi<GetBooksResponse[], { userId: string }>({
    path: BOOK_USER_ROUTE,
    method: MethodHttpEnum.GET,
    params: { userId },
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
