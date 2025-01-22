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
