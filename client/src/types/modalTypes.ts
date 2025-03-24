import React from 'react';
import { UseMutateFunction } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

export type SignupModelType = {
  form: string;
  email: string;
};

export type ForgotPasswordModelType = {
  form: string;
  email: string;
};

export type OnBoardingType = {
  currentStep: number;
  interests: string[];
  subscriptionPlan: number;
  gender: string;
  [key: string]: string | string[] | number;
};

export type UserModelTypes = {
  userName: string;
  phone: string;
  dateOfBirth: string;
  email: string;
};

export type AIModelType = {
  provider: string;
  reasoning: boolean;
  model: string;
  label: string;
  img: string;
};

export type PromptingStrategyType = {
  id: string;
  label: string;
  description?: string;
  element?: () => React.ReactNode;
};

export type GithubAuthModelType = {
  token: string | null;
  username: string | null;
};

export type SelfPromptingIterationType = {
  isGenerating: boolean;
  iterationCount: number;
  selectedIteration: number;
  conversationId: string | null;
  lastGeneratedIteration: number;
  apiCalled: boolean;
};
export type FileManagerSectionProps = {
  repoItems: RepoItemsType[] | null;
  selectedRepo: SelectedRepoType;
  selectedItems: RepoItemsType[] | null;
  setSelectedItems: Dispatch<SetStateAction<RepoItemsType[] | null>>;
};

export type SelectedRepoType = {
  label: string;
};

export type RepoItemsType = {
  name: string;
  type: string;
  size: number;
};

export type FetchFileContentParams = {
  fileSha: string;
};

export type UseGithubMutationReturn<T, K> = {
  isLoading: boolean;
  mutate: UseMutateFunction<K, unknown, T | undefined, unknown>;
};

export type UseGithubMutationProps<T, K> = {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  token: string;
  data?: T; // ✅ Now properly using `T` for request body
  onSuccess?: (data: K) => void;
  onError?: (error: any) => void;
  showToast?: boolean;
};
