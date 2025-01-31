'use client';

import OverviewMain from '@/components/DashboardCard/overview/OverviewMain';
import { useQuery } from '@/hooks/useQuery';
import { useParams } from 'next/navigation';
import { ApiUrl } from '@/constants/apiUrl';
import { useStoreActions } from 'easy-peasy';
import { useEffect } from 'react';

const Page = () => {
  const param = useParams();
  const conversationId = param.id;
  const setPrompt = useStoreActions(
    (actions: any) => actions?.promptModel?.setPrompt
  );
  const setConversation = useStoreActions(
    (actions: any) => actions?.conversationModel?.setConversation
  );
  const { data, isLoading } = useQuery<any>({
    queryKey: [conversationId],
    url: `${ApiUrl.GET_CHAT}/${conversationId}`,
    showToast: true,
  });
  useEffect(() => {
    if (data && !isLoading) {
      const { _id, code, messages } = data;
      setPrompt({ code: code, loader: false });
      setConversation({ conversationId: _id, messages: messages });
    }
  }, [data, isLoading]);
  return (
    <div className="h-screen w-full overflow-hidden bg-opacity-25 bg-purple-white-gradient-opactity25">
      <OverviewMain />
    </div>
  );
};

export default Page;
