'use client';

import React, { useEffect, useState, useRef } from 'react';
import OverviewLeft from './OverviewLeft';
import OverviewRight from './OverviewRight';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { ApiUrl } from '@/constants/apiUrl';
import { POST } from '@/hooks/consts';
import { useMutation } from '@/hooks/useMutation';
import { extractAttributes } from '@/utils/utils';

const OverviewMain = () => {
  const prompt = useStoreState((state: any) => state?.promptModel?.prompt);
  const setConversationIdAction = useStoreActions(
    (actions: any) => actions.conversationModel.setConversationId
  );
  const [content, setContent] = useState('');
  const [code, setCode] = useState('');
  const [loader, setLoader] = useState(true);
  const apiCalledRef = useRef(false);
  const { mutate } = useMutation<any>({
    isToaster: false,
    method: POST,
    url: ApiUrl.GENERATE_AI_RESPONSE,
    onSuccess: (res) => {
      console.log("res", res);
      const data = res?.data;
      setConversationIdAction(data?.conversationId);
      setCode(data?.appFiles);
      setContent(data?.text);
      setLoader(false)
    },
  });
  const promtHandler = async (promptData: any) => {
    const attributes = extractAttributes(promptData.question);
    mutate({humanPrompt: promptData.question, attributes});
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
