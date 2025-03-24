'use client';

import OverviewMain from '@/components/DashboardCard/overview/OverviewMain';
import { useQuery } from '@/hooks/useQuery';
import { useParams } from 'next/navigation';
import { ApiUrl } from '@/constants/apiUrl';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';
import { StoreModel } from '@/redux/model';
import { ConversationIdApiResponse } from '@/redux/model/conversationModel';
import { MessageInterface } from '@/redux/model/conversationModel';
import { useSelfPrompting } from '@/hooks/useSelfPrompting';
const Page = () => {
  const param = useParams();
  const conversationId = param.id;
  const setPrompt = useStoreActions<StoreModel>(
    (actions) => actions?.promptModel?.setPrompt
  );
  const setConversation = useStoreActions<StoreModel>(
    (actions) => actions?.conversationModel?.setConversation
  );
  const { data, isLoading } = useQuery<ConversationIdApiResponse>({
    queryKey: [conversationId],
    url: `${ApiUrl.GET_CHAT}/${conversationId}`,
    showToast: true,
  });
  useEffect(() => {
    if (data && !isLoading) {
      const { _id, messages, questionStatus } = data;
      setPrompt({ code: messages[messages.length - 1].code, loader: false });
      const unansweredQuestions = messages.filter(
        (msg: MessageInterface) => msg.isQuestion && !msg.userPrompt
      );
      const unansweredQuestionIndex = messages.findIndex(
        (msg: MessageInterface) => msg.isQuestion && !msg.userPrompt
      );
      setConversation({
        conversationId: _id,
        messages,
        unansweredQuestions,
        unansweredQuestionIndex,
        questionStatus,
      });
    }
  }, [data, isLoading]);
  return (
    <div className="h-screen w-full overflow-hidden bg-opacity-25 bg-purple-white-gradient-opactity25">
      <OverviewMain />
    </div>
  );
};

export default Page;
