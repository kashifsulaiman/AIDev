'use client';

import ConfirmEmail from './ConfirmEmail';
import ForgotPasswordForm from './ForgotPassword';
import SetPasswordForm from './SetNewPassword';
import { useStoreState } from 'easy-peasy';
const PasswordLayout = () => {
  const forgotPasswordState = useStoreState(
    (state: any) => state?.forgotPasswordObj?.forgotPasswordObj
  );

  const renderStep = () => {
    switch (forgotPasswordState?.form) {
      case 'ForgotPassword':
        return <ForgotPasswordForm />;
      case 'ConfirmEmail':
        return <ConfirmEmail />;
      case 'SetPasswordForm':
        return <SetPasswordForm />;
      default:
        return <ForgotPasswordForm />;
    }
  };

  return <div>{renderStep()}</div>;
};

export default PasswordLayout;
