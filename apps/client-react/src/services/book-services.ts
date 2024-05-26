import { AxiosResponse } from "axios";
import { AddBookInput, AddBookResponse } from "../interfaces/book.interface";
import {
  BOOKS_ROUTE,
  BOOK_ROUTE,
  MethodHttpEnum,
} from "../request/route-http/route-http";
import { UseRequestApi } from "../request/commons/useApiRequest";

export const getBooks = async () => {
  const res = await UseRequestApi<AddBookResponse[], null>({
    path: BOOKS_ROUTE,
    method: MethodHttpEnum.GET,
    includeAuthorizationHeader: false,
  });
  return res;
};

export const createBook = async (
  input: AddBookInput,
  userId: number | null,
  reset: () => void
) => {
  const params = { ...input, userId };
  const response: AxiosResponse = await UseRequestApi({
    method: MethodHttpEnum.POST,
    path: BOOK_ROUTE,
    params,
    includeAuthorizationHeader: true,
  });
  reset();
  return response;
};

