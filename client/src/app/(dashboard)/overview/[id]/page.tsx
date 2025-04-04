'use client';

import OverviewMain from '@/components/DashboardCard/overview/OverviewMain';
import { useQuery } from '@/hooks/useQuery';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { ApiUrl } from '@/constants/apiUrl';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';
import { StoreModel } from '@/redux/model';
import { ConversationIdApiResponse } from '@/redux/model/conversationModel';
import { MessageInterface } from '@/redux/model/conversationModel';
import { decrypt } from '@/utils/encryption';
const Page = () => {
  const param = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('shareToken');
  const sharedId = token ? decrypt(token) : null;

  const conversationId = param.id;
  const setPrompt = useStoreActions<StoreModel>(
    (actions) => actions?.promptModel?.setPrompt
  );
  const { setConversation, clearConversation } = useStoreActions<StoreModel>(
    (actions) => actions?.conversationModel
  );
  const conversation = useStoreState<StoreModel>(
    (state) => state?.conversationModel?.conversation
  );
  const { data, isLoading } = useQuery<ConversationIdApiResponse>({
    queryKey: [conversationId],
    url: `${ApiUrl.GET_CHAT}/${conversationId}`,
    showToast: true,
  });
  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!token) {
      const isInChatList = conversation.chatList.some(
        (chat: { _id: string }) => chat._id === conversationId
      );
      if (!isInChatList) {
        router.replace('/main');
        clearConversation();
      }
    } else {
      if (sharedId !== conversationId) {
        router.replace('/main');
        clearConversation();
      }
    }
    if (data) {
      const { _id, messages, questionStatus, githubRepoName, startCommand } =
        data;
      setPrompt({
        code: messages[messages.length - 1].code,
        loader: false,
        startCommand,
      });
      const unansweredQuestions = messages.filter(
        (msg: MessageInterface) => msg.isQuestion && !msg.userPrompt
      );
      const unansweredQuestionIndex = messages.findIndex(
        (msg: MessageInterface) => msg.isQuestion && !msg.userPrompt
      );
      setConversation({
        githubRepoName: githubRepoName ?? null,
        conversationId: _id,
        messages,
        unansweredQuestions,
        unansweredQuestionIndex,
        questionStatus,
        refinementRequired: true,
      });
    }
  }, [data, isLoading, token, sharedId, conversationId]);
  return (
    <div className="h-screen w-full overflow-hidden bg-opacity-25 bg-purple-white-gradient-opactity25">
      <OverviewMain />
    </div>
  );
};

export default Page;
