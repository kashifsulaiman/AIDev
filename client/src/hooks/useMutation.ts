import {
  UseMutateFunction,
  useMutation as useRMutation,
} from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
import { DELETE, PATCH, POST, PUT } from './consts';
import { showToaster } from '@/components/Toaster';
import { pagePaths } from '@/constants/pagePath';
import { useStoreActions } from 'easy-peasy';

type UseMutationReturn<T, K> = {
  data?: K;
  isLoading: boolean;
  mutate: UseMutateFunction<ApiResult<K>, unknown, T, unknown>;
  mutateAsync: (variables: T) => Promise<ApiResult<K>>;
};

type ApiResult<K> = {
  token: string;
  response: any;
  data?: any;
  message: string;
  _metadata: {
    message: string;
    numOfRecords: number;
    outcome: string;
    outcomeCode: number;
    Message?: string;
  };
  records: K;
  errors?: Array<string>;
  status?: number;
  Message?: string;
  success?: boolean;
};

type UseMutationProps<T, K> = {
  url: string;
  data?: T;
  method?: typeof POST | typeof DELETE | typeof PUT | typeof PATCH;
  token?: boolean;
  showToast?: boolean;
  showSuccessToast?: boolean;
  successMessage?: string;
  onSuccess?: (data: ApiResult<K>) => void;
  onError?: (data: ApiResult<K>) => void;
  errorMessage?: string;
  isFileData?: boolean;
  isCloud?: boolean;
  isPlatform?: boolean;
  isToaster?: boolean;
};

const returnPlatform = (isPlatform?: boolean) => {
  if (isPlatform) {
    return { platform: 'web' };
  }
  return {};
};

export const useMutation = <T, K = T>({
  url,
  data,
  method = POST || PATCH,
  showToast = true,
  onSuccess,
  onError,
  showSuccessToast = true,
  token,
  isPlatform,
  isToaster = true,
}: UseMutationProps<T, K>): UseMutationReturn<T, K> => {
  const userAction = useStoreActions((actions: any) => actions.userObj.add);
  const signupAction = useStoreActions((actions: any) => actions.signupObj.add);

  const jwtToken = Cookies.get('jwtToken');

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token ?? `${jwtToken}`,
    ...returnPlatform(isPlatform),
  };

  const config = {
    method,
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`,
    data,
    headers,
  };

  const deleteConfig = (method: string, data: T) => {
    if (method === DELETE) {
      config.url = `${config.url}/${data}`;
    }
  };

  const errorSubFunc = (newData: any, showToast: any) => {
    if (Array.isArray(newData?.response?.data?.message) && showToast) {
      showToaster(
        `${newData?.response?.data?.message[0] ?? 'Something went wrong'}`,
        'error'
      );
    } else if (showToast && newData?.message) {
      showToaster(
        `${newData?.response?.data?.message ?? 'Something went wrong'}`,
        'error'
      );
    }
  };

  const {
    data: fetchedData,
    isLoading,
    mutate,
    mutateAsync,
  } = useRMutation<ApiResult<K>, unknown, T>(
    async (data: T) => {
      deleteConfig(method, data);
      const res = await axios({
        ...config,
        ...(method === DELETE ? { data: undefined } : { data }),
      });
      return res.data;
    },
    {
      onSuccess: (newData) => {
        if (newData && showSuccessToast && newData?.message && isToaster) {
          showToaster(
            `${newData?.message ?? 'Something went wrong'}`,
            'success'
          );
        }
        onSuccess?.(newData);
      },
      onError: (newData: any) => {
        if (newData.response?.status === 401) {
          Cookies?.remove('jwtToken');
          userAction({});
          signupAction({
            form: 'SignUpForm',
            email: '',
          });
          window.location.href = pagePaths.LOGIN;
        }
        errorSubFunc(newData, showToast);
        onError?.(newData);
      },
    }
  );

  return { ...fetchedData, isLoading, mutate, mutateAsync };
};
