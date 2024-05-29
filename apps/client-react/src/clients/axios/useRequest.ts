import { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import { restRequestApiInstance } from "./restRequestApiInstance";
import { MethodHttpEnum } from "../../enum/enum";

export const UseRequest = async <TData, T>(
  baseURL: string,
  path: string,
  method: MethodHttpEnum,
  headers?: RawAxiosRequestHeaders,
  params?: T
): Promise<TData> => {
  const config: AxiosRequestConfig = {
    ...(method === MethodHttpEnum.GET ? params : params),
  };
  const response = await restRequestApiInstance(baseURL, headers)[method](
    path,
    method ? config : null
  );
  return response.data;
};
