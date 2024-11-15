'use client';

import { CButton } from '@/common/button';
import { FormikInput } from '@/common/Input';
import Text from '@/common/text/Index';
import { ApiUrl } from '@/constants/apiUrl';
import { pagePaths } from '@/constants/pagePath';
import { POST } from '@/hooks/consts';
import { useMutation } from '@/hooks/useMutation';
import { NewPasswordFormSchema } from '@/ValidationSchema';
import { useStoreState } from 'easy-peasy';
import { Field, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';

const SetPasswordForm = () => {
  const router = useRouter();
  const forgotPasswordState = useStoreState(
    (state: any) => state?.forgotPasswordObj?.forgotPasswordObj
  );

  const { mutate, isLoading } = useMutation<any>({
    method: POST,
    url: ApiUrl.RESET_NEW_PASS,
    onSuccess: () => {
      router.push(pagePaths.LOGIN);
    },
  });

  const onSubmit = (value: { password: string; confirmPassword: string }) => {
    mutate({ ...value, email: forgotPasswordState?.email });
  };

  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  return (
    <div className="flex w-full flex-col justify-center rounded-2xl bg-white p-7 sm:mx-0 sm:min-w-[534px] sm:p-[50px]">
      <Formik
        initialValues={initialValues}
        validationSchema={NewPasswordFormSchema}
        onSubmit={onSubmit}
      >
        {({ isValid, dirty, touched, errors, handleSubmit }) => (
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <h2 className="font-Jakarta text-2xl font-bold text-authgray-100 sm:text-[32px]">
                Set New Password
              </h2>
              <Text className="font-Jakarta text-base font-normal !text-authgray-100 sm:text-lg">
                Let’s create your new password.
              </Text>
              <Field
                component={FormikInput}
                errorMessage={touched?.password && errors?.password}
                isClearable={false}
                label="New Password"
                name="password"
                placeholder="Enter password"
                type="password"
              />
              <Field
                component={FormikInput}
                errorMessage={
                  touched?.confirmPassword && errors?.confirmPassword
                }
                isClearable={false}
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Enter password"
                type="password"
              />
            </div>
            <CButton
              label="Save Password"
              variant="primary"
              colorPrimary
              type="submit"
              className="mt-5 h-12 text-sm sm:text-base"
              isDisabled={isLoading || !(isValid && dirty)}
            />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SetPasswordForm;
