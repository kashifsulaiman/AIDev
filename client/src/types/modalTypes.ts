import { Dispatch, SetStateAction } from "react";

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
};

export type GithubAuthModelType = {
  token: string | null;
  username: string | null;
};

export type FileManagerSectionProps = {
  repoItems: RepoItemsType[] | null;
  selectedRepo: SelectedRepoType;
  selectedItems: RepoItemsType[] | null;
  setSelectedItems: Dispatch<SetStateAction<RepoItemsType[] | null>>;
}

export type SelectedRepoType = {
  label: string
}

export type RepoItemsType = {
  name: string,
  type: string,
  size: number
}

export type FetchFileContentParams = {
  fileSha: string;
};
