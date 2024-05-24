import { QueryClient, QueryKey } from "@tanstack/react-query";
import axios, { AxiosError, RawAxiosRequestHeaders } from "axios";
import { enqueueSnackbar } from "notistack";
import { UseRequest } from "../clients/axios/useRequest";
import { BASE_URL, MethodHttpEnum } from "./route-http/route-http";

interface useApiRequestProps<TData, T> {
  includeAuthorizationHeader: boolean;
  queryKey?: QueryKey;
  path: string;
  method: MethodHttpEnum;
  onSuccess?: (res?: Awaited<TData>) => void | undefined;
  params?: T & { "groups[]"?: string[] };
  headers?: RawAxiosRequestHeaders;
}

const queryClient = new QueryClient();

export async function useApiRequest<TData, T>({
  queryKey = [],
  path,
  method,
  includeAuthorizationHeader = true, 
  headers,
}: useApiRequestProps<TData, T>) {
  const headersApiNest = {
    Accept: 'application/ld+json',
    ...(includeAuthorizationHeader && {
      Authorization: `Bearer ${localStorage.getItem('OnePacApiJwtToken')}`,
    }),
    ...headers,
  };

  return queryClient.fetchQuery<TData>({
    queryKey,
    queryFn: async () => {
      try {
        const res = await UseRequest<TData, T>(BASE_URL, path, method, headersApiNest);
        return res
      } catch (error) {
        console.log(error);
        enqueueSnackbar(`Une erreur s'est produite`, { variant: 'error' });
        
        if (axios.isAxiosError(error)) {
          const axiosError: AxiosError = error;
          if (axiosError.response && axiosError.response?.status < 200 || axiosError.response && axiosError.response?.status >= 300) {
            enqueueSnackbar(axiosError.response?.statusText, { variant: 'error' });
          }
          enqueueSnackbar(axiosError.response?.statusText, { variant: 'error' });
          throw error
          
        }
        throw error
      }
    }
  })
}
