'use client';

import { CButton } from '@/common/button';
import CInput from '@/common/Input';
import Text from '@/common/text/Index';
import { ApiUrl } from '@/constants/apiUrl';
import { pagePaths } from '@/constants/pagePath';
import { POST } from '@/hooks/consts';
import { useMutation } from '@/hooks/useMutation';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Cookies from 'js-cookie';

const ConfirmEmail = () => {
  const router = useRouter();
  const signupState = useStoreState((state: any) => state.signupObj.signupObj);
  const userAction = useStoreActions((actions: any) => actions.userObj.add);
  const [code, setCode] = useState('');
  const { mutate, isLoading } = useMutation<any>({
    method: POST,
    url: ApiUrl.VERIFY_EMAIL,
    onSuccess: (res) => {
      Cookies.set('jwtToken', res.data?.token);
      userAction(res.data?.user);
      router.push(pagePaths.LOGIN);
    },
  });

  const onsubmit = () => {
    mutate({ email: signupState?.email, otp: code });
  };
  return (
    <div className="mx-3 flex max-w-full flex-col justify-center rounded-2xl bg-white p-7 sm:mx-0 sm:max-w-[534px] sm:p-[50px]">
      <div className="flex flex-col gap-4">
        <h2 className="font-Jakarta text-2xl font-bold text-authgray-100 sm:text-[32px]">
          Confirm Your Email
        </h2>
        <Text className="font-Jakarta text-base font-normal !text-authgray-100 sm:text-lg">
          We’ve sent a verification code to confirmation at (
          {signupState?.email})
        </Text>
        <CInput
          label="Enter the Code"
          placeholder="xxxxxxxxx"
          className="placeholder:text-authgray-200"
          value={code}
          type={'number'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCode(e.target.value)
          }
        />
      </div>
      <CButton
        label="Verify"
        variant="primary"
        colorPrimary
        className="mt-5 h-12 text-sm font-medium sm:text-base"
        isDisabled={!code || isLoading}
        onClick={() => onsubmit()}
      />
    </div>
  );
};

export default ConfirmEmail;
