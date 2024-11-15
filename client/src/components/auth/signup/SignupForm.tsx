'use client';

import { CButton } from '@/common/button';
import Checkbox from '@/common/Checkbox';
import { FormikInput } from '@/common/Input';
import Text from '@/common/text/Index';
import { ApiUrl } from '@/constants/apiUrl';
import { pagePaths } from '@/constants/pagePath';
import { POST } from '@/hooks/consts';
import { useMutation } from '@/hooks/useMutation';
import { signUpFormSchema } from '@/ValidationSchema';
import { useStoreActions } from 'easy-peasy';
import { Field, Formik } from 'formik';
import Link from 'next/link';
import React, { useState } from 'react';

const SignUpForm = () => {
  const signupAction = useStoreActions((actions: any) => actions.signupObj.add);
  const [email, setEmail] = useState('');

  const { mutate, isLoading } = useMutation<any>({
    method: POST,
    url: ApiUrl.SINGUP,
    onSuccess: () => {
      signupAction({
        form: 'ConfirmEmail',
        email: email,
      });
      setEmail('');
    },
  });

  const onSubmit = async (values: any) => {
    mutate(values);
    setEmail(values?.email);
  };

  const initialValues = {
    name: '',
    email: '',
    password: '',
    accept: false,
  };

  return (
    <div className="flex w-full flex-col justify-center rounded-2xl bg-white p-6 sm:min-w-[534px] sm:px-10 sm:py-12 md:mx-auto">
      <div className="Scroller-Class max-h-[72vh] overflow-y-auto scrollbar-hide">
        <Formik
          initialValues={initialValues}
          validationSchema={signUpFormSchema}
          onSubmit={onSubmit}
        >
          {({ isValid, dirty, touched, errors, handleSubmit }) => (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <h2 className="font-Jakarta text-[28px] font-bold text-authgray-100 md:text-[32px]">
                  Create Account
                </h2>
                <Text className="font-Jakarta text-sm font-normal !text-authgray-100 sm:text-base">
                  Sign up for a new account
                </Text>
                <Field
                  component={FormikInput}
                  errorMessage={touched.name && errors?.name}
                  label="Name"
                  name="name"
                  placeholder="Enter name"
                  classNames="border-none focus:outline-none focus-visible:ring-0 focus-visible:border-none focus-visible:outline-none ring-2 ring-transparent group-[data-focus-visible='true']:ring-0"
                />
                <Field
                  component={FormikInput}
                  errorMessage={touched.email && errors?.email}
                  label="Email"
                  name="email"
                  placeholder="Enter email"
                  classNames="focus-visible:border-none border-none focus:outline-none focus-visible:outline-none"
                />
                <Field
                  component={FormikInput}
                  errorMessage={touched?.password && errors?.password}
                  isClearable={false}
                  label="Password"
                  name="password"
                  placeholder="Enter password"
                  type="password"
                  classNames="focus-visible:border-none border-none focus:outline-none focus-visible:outline-none"
                />
                <div className="mb-2 flex items-center gap-1">
                  <Field component={Checkbox} label={''} name="accept" />
                  <Text className="font-Jakarta text-sm font-normal !text-authgray-300">
                    I accept the
                    <span className="ml-1">
                      <Link
                        href={pagePaths.TERMCONDITION}
                        className="font-Jakarta text-sm font-normal text-authblue-100"
                      >
                        Terms of service
                      </Link>
                      <span className="mx-2">and</span>
                      <Link
                        href={pagePaths.PRIVACYPOLICY}
                        className="font-Jakarta text-sm font-normal text-authblue-100"
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </Text>
                </div>
              </div>

              <CButton
                label="Continue"
                variant="primary"
                colorPrimary
                type="submit"
                isDisabled={isLoading || !(isValid && dirty)}
                className="!h-12 w-full text-sm !font-medium sm:text-base"
              />
            </form>
          )}
        </Formik>
        <div className="mb-3 flex flex-col items-center justify-center gap-2.5 sm:my-6 sm:flex-row">
          <h2 className="text-sm font-normal text-[#0F172A] sm:text-base">
            Already have an account?
          </h2>
          <Link
            className="text-auth-100 font-Jakarta text-sm font-medium text-authblue-100 sm:text-base"
            href={pagePaths.LOGIN}
          >
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
