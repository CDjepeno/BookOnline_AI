import { AxiosResponse, RawAxiosRequestHeaders } from "axios";
import { UseRequest } from "../../clients/axios/useRequest";
import { BASE_URL, CURRENT_USER_ROUTE, MethodHttpEnum, Route } from "../route-http/route-http";

interface useApiRequestProps<T> {
  includeAuthorizationHeader: boolean;
  path: string;
  method: MethodHttpEnum;
  params?: T;
  headers?: RawAxiosRequestHeaders;
}

export async function UseRequestApi<TData, T>({
  path,
  method,
  includeAuthorizationHeader = true,
  headers,
  params,
}: useApiRequestProps<T>) {
  const storedValue = localStorage.getItem("BookToken");
  const parsedObject = JSON.parse(storedValue as string);
  const headersApiNest = {
    Accept: "application/json",
    ...(includeAuthorizationHeader && {
      Authorization: `Bearer ${parsedObject}`,
    }),
    ...headers,
  };
  const response = await UseRequest<TData, T>(
    BASE_URL,
    path,
    method,
    headersApiNest,
    params
  );
  return response;
}
