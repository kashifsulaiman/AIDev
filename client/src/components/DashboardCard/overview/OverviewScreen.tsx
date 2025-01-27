'use client';

import OverviewMain from '@/components/DashboardCard/overview/OverviewMain';
import { showToaster } from '@/components/Toaster';
import { StoreModel } from '@/redux/model';
import { Prompt } from '@/redux/model/promptModel';
import { Project } from '@stackblitz/sdk';
import { useStoreState, useStoreActions, Actions, State } from 'easy-peasy';
import React, { useEffect, useRef, useState } from 'react';

const OverviewScreen = () => {
  const [view, setView] = useState(true);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((registration) => {
          console.log('Service Worker Registered:', registration);
        })
        .catch((error) => {
          console.error('Service Worker Registration Failed:', error);
        });
    }
  }, []);

  const handleViewChange = () => {
    setView(!view);
  };

  const prompt = useStoreState(
    (state: State<StoreModel>) => state?.promptModel?.prompt
  );

  const [content, setContent] = useState('');
  const [code, setCode] = useState<Project | null>(null);
  const [loader, setLoader] = useState(true);
  const setPrompt = useStoreActions(
    (actions: Actions<StoreModel>) => actions?.promptModel?.setPrompt
  );
  const apiCalledRef = useRef(false);
  const extractAttributes = (inputPrompt: string) => {
    const allowedFrameworks = ['next', 'react', 'vue'];
    const lowerCasePrompt = inputPrompt.toLowerCase();
    const attributes = { framework: 'react' };
    const findFrameworkIndex = allowedFrameworks.findIndex((item) =>
      lowerCasePrompt.includes(item)
    );
    if (findFrameworkIndex !== -1)
      attributes.framework = allowedFrameworks[findFrameworkIndex];
    return attributes;
  };
  const promtHandler = async (promptData: Prompt) => {
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
    <div className="h-full bg-[#E6E6E6] bg-opacity-25">
      <div>
        <OverviewMain
          handleViewChange={handleViewChange}
          code={code}
          content={content}
          loader={loader}
          view={view}
        />
      </div>
    </div>
  );
};

export default OverviewScreen;
