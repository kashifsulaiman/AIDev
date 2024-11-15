'use client';

import { useRouter } from 'next/navigation'; // Updated import for client-side use
import { CButton } from '@/common/button';
import { FormikInput } from '@/common/Input';
import Text from '@/common/text/Index';
import { ApiUrl } from '@/constants/apiUrl';
import { POST } from '@/hooks/consts';
import { useMutation } from '@/hooks/useMutation';
import { ForgotPasswordFormSchema } from '@/ValidationSchema';
import { useStoreActions } from 'easy-peasy';
import { Field, Formik } from 'formik';
import { useState } from 'react';

const ForgotPasswordForm = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/log-in');
  };

  const forgotPasswordAction = useStoreActions(
    (actions: any) => actions.forgotPasswordObj.add
  );
  const [email, setEmail] = useState('');

  const { mutate, isLoading } = useMutation<any>({
    method: POST,
    url: ApiUrl.FORGOT_PASS,
    onSuccess: () => {
      forgotPasswordAction({
        form: 'ConfirmEmail',
        email: email,
      });
      setEmail('');
    },
  });

  const onSubmit = (value: { email: string }) => {
    mutate(value);
    setEmail(value.email);
  };

  return (
    <div className="flex max-w-full flex-col justify-center rounded-2xl bg-white p-7 sm:max-w-[534px] sm:p-[50px]">
      <Formik
        initialValues={{ email: '' }}
        validationSchema={ForgotPasswordFormSchema}
        onSubmit={onSubmit}
      >
        {({ isValid, dirty, touched, errors, handleSubmit }) => (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 sm:gap-4">
              <h2 className="font-Jakarta text-2xl font-bold text-authgray-100 sm:text-[32px]">
                Forgot Password?
              </h2>
              <Text className="font-Jakarta text-base font-normal !text-authgray-100 sm:text-lg">
                Please enter your email below and we will send you the reset
                link.
              </Text>
              <Field
                component={FormikInput}
                errorMessage={touched.email && errors?.email}
                label="Email"
                name="email"
                placeholder="Enter email"
              />
            </div>
            <div className="flex w-full flex-col items-center gap-4">
              <CButton
                isDisabled={isLoading || !(isValid && dirty)}
                label="Submit"
                colorPrimary
                variant="primary"
                className="h-12 w-full text-sm sm:text-base"
                type="submit"
              />
              <CButton
                label="Go Back"
                variant="secondary"
                className="h-12 w-full text-sm text-black sm:text-base"
                onClick={handleGoBack}
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPasswordForm;
