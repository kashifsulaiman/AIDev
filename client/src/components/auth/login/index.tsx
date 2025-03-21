'use client';

import { CButton } from '@/common/button';
import Checkbox from '@/common/Checkbox';
import { FormikInput } from '@/common/Input';
import Text from '@/common/text/Index';
import { ApiUrl } from '@/constants/apiUrl';
import { pagePaths } from '@/constants/pagePath';
import { POST } from '@/hooks/consts';
import { useMutation } from '@/hooks/useMutation';
import { LoginFormSchema } from '@/ValidationSchema';

import { Button, Spinner } from '@nextui-org/react';
import { useStoreActions } from 'easy-peasy';
import { Field, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useLayoutEffect } from 'react';
import Cookies from 'js-cookie';
import { StoreModel } from '@/redux/model';

interface LoginFormProps {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login = () => {
  const router = useRouter();
  const userAction = useStoreActions((actions: any) => actions.userObj.add);
  const signupAction = useStoreActions((actions: any) => actions.signupObj.add);
  const forgotPasswordAction = useStoreActions(
    (actions: any) => actions.forgotPasswordObj.add
  );
  const clearPrompt = useStoreActions<StoreModel>(
    (actions) => actions?.promptModel?.clearPrompt
  );
  const clearConversation = useStoreActions<StoreModel>(
    (actions) => actions?.conversationModel?.clearConversation
  );
  const clearSelfPromptingIteration = useStoreActions<StoreModel>(
    (actions) => actions?.selfPromptingModel?.clearSelfPromptingIteration
  );
  useLayoutEffect(() => {
    forgotPasswordAction({
      form: 'ForgotPassword',
      email: '',
    });
    signupAction({
      form: 'SignUpForm',
      email: '',
    });
    clearPrompt();
    clearConversation();
    clearSelfPromptingIteration()
  }, []);

  const { mutate, isLoading } = useMutation<any>({
    method: POST,
    url: ApiUrl.LOGIN,
    onSuccess: (res) => {
      if (res?.data?.user?.isEmailVerified) {
        Cookies.set('jwtToken', res.data?.token);
        userAction(res.data?.user);
        router.push(pagePaths.MAIN);
      } else {
        signupAction({
          form: 'ConfirmEmail',
          email: res.data?.user?.email,
        });
        router.push(pagePaths.SIGNUP);
      }
    },
  });
  const { mutate: guestUser, isLoading: guestIsLoading } = useMutation<any>({
    method: POST,
    url: ApiUrl.GUEST_LOGIN,
    onSuccess: (res) => {
      if (res?.data?.user?.isGuestUser) {
        Cookies.set('jwtToken', res.data?.token);
        userAction(res.data?.user);
        router.push(pagePaths.MAIN);
      }
    },
  });

  const onSubmit = async (values: LoginFormProps) => {
    mutate(values);
  };

  const initialValues = {
    email: '',
    password: '',
    rememberMe: false,
  };

  const guestLogin = async () => {
    guestUser({});
  };

  return (
    <div className="flex flex-col justify-center rounded-2xl bg-white p-6 sm:m-auto sm:min-w-[534px] sm:px-10 sm:py-12">
      <div className="Scroller-Class max-h-[72vh] overflow-y-auto scrollbar-hide">
        <Formik
          initialValues={initialValues}
          validationSchema={LoginFormSchema}
          onSubmit={onSubmit}
        >
          {({ isValid, dirty, touched, errors, handleSubmit }) => (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <h2 className="font-Jakarta text-[28px] font-bold text-authgray-100 md:text-[32px]">
                  Login
                </h2>
                <Text className="font-Noto !text-sm font-normal !text-authgray-100 sm:!text-base">
                  Please enter your credentials below to access the application.
                </Text>
                <Field
                  component={FormikInput}
                  errorMessage={touched.email && errors?.email}
                  label="Email"
                  name="email"
                  placeholder="Enter email"
                  classNames="text-sm sm:text-base focus-visible:border-none border-none focus:outline-none focus-visible:outline-none"
                />
                <Field
                  component={FormikInput}
                  errorMessage={touched?.password && errors?.password}
                  isClearable={false}
                  label="Password"
                  name="password"
                  placeholder="Enter password"
                  type="password"
                  classNames="text-sm sm:text-base focus-visible:border-none border-none focus:outline-none focus-visible:outline-none"
                />
              </div>
              <div className="mb-2 flex items-center justify-start">
                <div className="hidden items-center gap-2">
                  <Field component={Checkbox} label={''} name="accept" />
                  <Text className="font-Jakarta text-sm font-medium !text-authgray-300">
                    Remember me
                  </Text>
                </div>
                <Link
                  href={pagePaths.FORGOT_PASSWORD}
                  className="font-Jakarta text-sm font-medium !text-authgray-300"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="flex w-full flex-col-reverse items-center justify-center gap-4 sm:flex-row">
                <CButton
                  label="Login"
                  variant="secondary"
                  colorPrimary
                  className="h-12 w-full !rounded-[50px] border border-[#dadada] bg-[#f3f4f6] text-sm text-authgray-100 sm:text-base"
                  type="submit"
                  isDisabled={
                    isLoading || guestIsLoading || !(isValid && dirty)
                  }
                  isLoading={isLoading}
                />
                <Button
                  className="flex !h-12 w-full items-center rounded-full border border-blueTheme-600 bg-gradient-to-r from-custom-purple to-custom-blue px-4 py-3 font-Jakarta text-sm font-normal !text-[#ffffff] sm:text-base"
                  onClick={guestLogin}
                  isDisabled={isLoading || guestIsLoading}
                >
                  {guestIsLoading ? (
                    <Spinner color="white" size="sm" />
                  ) : (
                    <span className="font-Jakarta text-sm font-normal text-[#ffffff] sm:text-base">
                      Login as guest user
                    </span>
                  )}
                </Button>
              </div>
            </form>
          )}
        </Formik>

        <div className="my-4 flex flex-col items-center justify-center gap-2.5 sm:my-6 sm:flex-row">
          <h2 className="text-auth-100 text-sm font-normal text-black sm:text-base">
            Don’t have an account?
          </h2>
          <Link
            className="text-auth-100 font-Jakarta text-sm font-medium text-authblue-100 sm:text-base"
            href={pagePaths.SIGNUP}
          >
            Register here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
