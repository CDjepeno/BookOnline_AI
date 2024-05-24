import { BookI } from "../interfaces";
import { BookQueriesKeys } from "../request/keys/clientQueriesKey";
import { BOOKS_ROUTE, MethodHttpEnum } from "../request/route-http/route-http";
import { useApiRequest as UseApiRequest } from "../request/useApiRequest";

export const getBooks = async () => {
  const res = await UseApiRequest({
    queryKey: [BookQueriesKeys.GetBooks],
    path: BOOKS_ROUTE,
    method: MethodHttpEnum.GET,
    includeAuthorizationHeader: false,
  });
  return {
    books: res as BookI[],
  };
};
