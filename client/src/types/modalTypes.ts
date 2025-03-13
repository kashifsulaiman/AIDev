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

export type GithubAuthModelType = {
  token: string | null;
  username: string | null;
};

export type DropdownItemType = {
  provider: string;
  reasoning: boolean;
  model: string;
  label: string;
  img: string;
};
