import { UseMutateFunction, useMutation as useRMutation } from "@tanstack/react-query";
import axios from "axios";
import { showToaster } from "@/components/Toaster";

type UseGithubMutationReturn<T, K> = {
    isLoading: boolean;
    mutate: UseMutateFunction<K, unknown, T, unknown>;
};

type UseGithubMutationProps<T, K> = {
    url: string;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    token: string;
    onSuccess?: (data: K) => void;
    onError?: (error: any) => void;
    showToast?: boolean;
};

export const useGithubMutation = <T = void, K = any>({
    url,
    method = "GET",
    token,
    onSuccess,
    onError,
    showToast = true,
}: UseGithubMutationProps<T, K>): UseGithubMutationReturn<T, K> => {
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
    };

    const {
        isLoading,
        mutate,
    } = useRMutation<K, unknown, T>(
        async (data?: T) => {
            const res = await axios({
                method,
                url: `https://api.github.com${url}`,
                headers,
                data: method !== "GET" ? data : undefined,
            });
            return res.data;
        },
        {
            onSuccess: (data) => {
                onSuccess?.(data);
            },
            onError: (error) => {
                if (showToast) showToaster("Something went wrong", "error");
                onError?.(error);
            },
        }
    );

    return { isLoading, mutate };
};
