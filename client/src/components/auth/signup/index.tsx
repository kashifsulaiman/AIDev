'use client';

import SignUpForm from './SignupForm';
import ConfirmEmail from './ConfirmYourEmail';
import { useStoreState } from 'easy-peasy';
const SignUpLayout = () => {
  const signupState = useStoreState(
    (state: any) => state?.signupObj?.signupObj
  );

  const renderStep = () => {
    switch (signupState?.form) {
      case 'SignUpForm':
        return <SignUpForm />;
      case 'ConfirmEmail':
        return <ConfirmEmail />;
      default:
        return <SignUpForm />;
    }
  };

  return <div>{renderStep()}</div>;
};

export default SignUpLayout;
