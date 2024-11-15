import axios from 'axios';
import {
  QueryKey as QueryKeyHook,
  useQuery as useRQuery,
} from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { GET } from './consts';
import { useStoreActions } from 'easy-peasy';
import { pagePaths } from '@/constants/pagePath';

type UseQueryReturn<T> = {
  data?: T;
  _metadata?: {
    message: string;
    numOfRecords: number;
    outcome: string;
    outcomeCode: number;
  };
  errors?:
    | Array<{
        map: string;
        message: string;
      }>
    | string
    | {
        message: string;
      };
  isLoading?: boolean;
  isFetching?: boolean;
  refetch: () => void;
};

type ApiResult<T> = {
  _metadata: {
    message: string;
    numOfRecords: number;
    outcome: string;
    outcomeCode: number;
  };
  data: T;
  errors:
    | Array<{
        map: string;
        message: string;
      }>
    | string
    | { message: string };
};

type UseQueryProps<T> = {
  url: string;
  data?: T;
  method?: string;
  token?: boolean;
  queryKey: QueryKeyHook;
  showToast?: boolean;
  onSuccess?: (data?: T) => void;
  enabled?: boolean;
  params?: { [key: string]: string | number | undefined };
  refetchInterval?: number;
};

export const useQuery = <T>({
  url: endpoint,
  data,
  method = GET,
  queryKey,
  onSuccess,
  enabled = true,
  params,
  refetchInterval,
}: UseQueryProps<T>): UseQueryReturn<T> => {
  const userAction = useStoreActions((actions: any) => actions.userObj.add);
  const signupAction = useStoreActions((actions: any) => actions.signupObj.add);

  const jwtToken = Cookies.get('jwtToken');
  const headers = {
    Accept: 'application/json',
    Authorization: jwtToken,
  };

  let queryString = '';

  if (params) {
    queryString = `?${Object.keys(params)
      .filter((key) => params[key] !== undefined && params[key] !== '')
      .map(
        (key) =>
          encodeURIComponent(key) +
          '=' +
          encodeURIComponent(params[key] as string)
      )
      .join('&')}`;
  }

  const url = endpoint + queryString;

  const config = {
    method,
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`,
    data,
    headers,
  };

  const {
    data: fetchedData,
    isLoading,
    isFetching,
    refetch,
  } = useRQuery<ApiResult<T>>(
    queryKey,
    () =>
      axios(config)
        .then((res) => res.data)
        .catch((error: any) => {
          if (error.response?.status === 401) {
            Cookies?.remove('jwtToken');
            userAction({});
            signupAction({
              form: 'SignUpForm',
              email: '',
            });
            window.location.href = pagePaths.LOGIN;
          }
        }),
    {
      enabled,
      refetchInterval,
      onSuccess: ({ data }) => {
        onSuccess?.(data);
      },
    }
  );

  let results = undefined;

  if (fetchedData) {
    const { data, ...rest } = fetchedData;
    results = { data, ...rest };
  }
  return { ...results, isLoading, isFetching, refetch };
};
