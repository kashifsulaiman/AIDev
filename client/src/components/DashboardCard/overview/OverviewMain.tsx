'use client';

import React, { useEffect, useState, useRef } from 'react';
import OverviewLeft from './OverviewLeft';
import OverviewRight from './OverviewRight';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { showToaster } from '@/components/Toaster';

const OverviewMain = () => {
  const prompt = useStoreState((state: any) => state?.promptModel?.prompt);

  const [content, setContent] = useState('');
  const [code, setCode] = useState('');
  const [loader, setLoader] = useState(true);
  const setPrompt = useStoreActions(
    (actions: any) => actions?.promptModel?.setPrompt
  );
  const apiCalledRef = useRef(false);
  const extractAttributes = (inputPrompt: string) => {
    const allowedFrameworks = ['next', 'react', 'vue'];
    const lowerCasePrompt = inputPrompt.toLowerCase();
    const attributes = { framework: 'react'};
    const findFrameworkIndex = allowedFrameworks.findIndex(item => lowerCasePrompt.includes(item));
    if(findFrameworkIndex !== -1) attributes.framework = allowedFrameworks[findFrameworkIndex]
    return attributes;
  };
  const promtHandler = async (promptData: any) => {
    const attributes = extractAttributes(promptData.question);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/generate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            humanPrompt: promptData.question,
            attributes,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setCode(data?.data?.appFiles);
      setContent(data?.data?.text);
      setLoader(false);
      promptData.code = data?.data?.appFiles;
      setPrompt(promptData);
    } catch (error: any) {
      showToaster(error.message ?? 'Something went wrong', 'error');
    }
  };

  useEffect(() => {
    if (prompt?.question && !apiCalledRef.current) {
      apiCalledRef.current = true;
      promtHandler(prompt);
    }
  }, [prompt?.question]);

  return (
    <div className="flex max-h-screen min-h-screen w-full max-sm:max-h-full max-sm:flex-col max-sm:gap-4">
      <OverviewLeft content={content} loader={loader} />
      <OverviewRight code={code} loader={loader} />
    </div>
  );
};

export default OverviewMain;
