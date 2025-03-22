import {
  useMutation as useRMutation,
} from '@tanstack/react-query';
import axios from 'axios';
import { showToaster } from '@/components/Toaster';
import {
  UseGithubMutationProps,
  UseGithubMutationReturn,
} from '@/types/modalTypes';

export const useGithubMutation = <T = void, K = any>({
  url,
  method = 'GET',
  token,
  data,
  onSuccess,
  onError,
  showToast = true,
}: UseGithubMutationProps<T, K>): UseGithubMutationReturn<T, K> => {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };

  const { isLoading, mutate } = useRMutation<K, unknown, T | undefined>(
    async (requestData?: T) => {
      const config = {
        method,
        url: `https://api.github.com${url}`,
        headers,
        ...(method !== 'GET' && { data: requestData ?? data }),
      };

      const res = await axios(config);
      return res.data;
    },
    {
      onSuccess: (data) => {
        if (showToast) showToaster('Success!', 'success');
        onSuccess?.(data);
      },
      onError: (error) => {
        if (showToast) showToaster('Something went wrong', 'error');
        onError?.(error);
      },
    }
  );

  return { isLoading, mutate };
};
