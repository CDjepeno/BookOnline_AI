import { MethodHttpEnum } from "./route-http/route-http";

interface useBigdataRequestProps<TData, T> {
  path: string;
  method: MethodHttpEnum;
  queryKey?: QueryKey;
  onSuccess?: (res?: Awaited<TData>) => void | undefined;
  params?: T & { 'groups[]'?: string[] };
  includeAuthorizationHeader?: boolean;
  headers?: RawAxiosRequestHeaders;
  queryOptions?: { enabled: boolean };
}

export const useBigdataRequest = <TData, T>({
  path,
  method,
  queryKey = [],
  includeAuthorizationHeader = true,
  headers,
  onSuccess,
  params,
  queryOptions,
}: useBigdataRequestProps<TData, T>) => {
  const baseUrl = 'localhost:3000' ?? '';
  const headersBigdata = {
    Accept: 'application/ld+json',
    ...(includeAuthorizationHeader && {
      Authorization: `Bearer ${localStorage.getItem('OnePacApiJwtToken')}`,
    }),
    ...headers,
  };

  return useQuery<TData>(
    [...queryKey, params],
    async () => {
      try {
        const res = await UseRequest<TData, T>(
          baseUrl,
          path,
          method,
          params,
          headersBigdata
        );
        onSuccess?.();

        return res;
      } catch (error: any) {
        if (error.response?.data?.status === 401) {
          await refreshToken();
          const response = await restRequestApiInstance(baseUrl)[method](
            path,
            params
          );
          return response.data;
        }
        if (error.response?.status < 200 || error.response?.status >= 300) {
          enqueueSnackbar(error.response?.statusText, { variant: 'error' });
        }
        return error.response;
      }
    },
    { ...queryOptions }
  );
};
