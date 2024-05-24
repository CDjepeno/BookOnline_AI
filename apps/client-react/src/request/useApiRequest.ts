import { QueryClient } from "@tanstack/react-query";

// interface useApiRequestProps<TData, T> {
//   path: string;
//   method: MethodHttpEnum;
//   queryKey?: QueryKey;
//   onSuccess?: (res?: Awaited<TData>) => void | undefined;
//   params?: T & { "groups[]"?: string[] };
//   includeAuthorizationHeader?: boolean;
//   headers?: RawAxiosRequestHeaders;
//   queryOptions?: { enabled: boolean };
// }

const queryClient = new QueryClient();

export async function useApiRequest<T>(
  queryKey: string[],
  queryFn: () => Promise<T>
): Promise<T> {
  const res = await queryClient.fetchQuery({ queryKey, queryFn: () => {
    return Promise.resolve()
  }


   });
  return res;
}
