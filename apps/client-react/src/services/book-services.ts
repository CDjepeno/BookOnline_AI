import { restRequestApiInstance } from "../clients/axios/restRequestApiInstance";
import { BOOKS_ROUTE, MethodHttpEnum } from "../request/route-http/route-http";
import { useApiRequest } from "../request/useApiRequest";

export async function getBooks() {
  const books = useApiRequest();
  return books;
}
