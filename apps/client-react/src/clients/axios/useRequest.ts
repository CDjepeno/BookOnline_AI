import { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import { MethodHttpEnum } from "../../request/route-http/route-http";
import { restRequestApiInstance } from "./restRequestApiInstance";

export const UseRequest = async <TData, T>(

  //const useRequest: <TData, T>(baseURL: string, path: string, method: MethodEnum, params?: T | undefined, headers?: any) => Promise<TData>
  baseURL: string,
  path: string,
  method: MethodHttpEnum,
  headers?: RawAxiosRequestHeaders,
  params?: T,
): Promise<TData> => {
  const config: AxiosRequestConfig = {
    headers,
    ...(method === MethodHttpEnum.GET ? { params } : {}),
  };
  const response = await restRequestApiInstance(baseURL, headers)[method](
    path,
    method === MethodHttpEnum.GET
      ? config
      : headers?.["Content-Type"] === "multipart/form-data"
      ? params
      : { ...params }
  );
  return response.data;
};
