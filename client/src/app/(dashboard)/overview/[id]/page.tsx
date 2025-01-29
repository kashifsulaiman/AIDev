"use client";

import OverviewMain from '@/components/DashboardCard/overview/OverviewMain';
import { useQuery } from '@/hooks/useQuery';
import { useParams } from 'next/navigation';
import { ApiUrl } from '@/constants/apiUrl';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';

const page = () => {
  const param = useParams();
  const conversationId = param.id;
 console.log("conversationId",conversationId);
  const setPrompt = useStoreActions(
    (actions: any) => actions?.promptModel?.setPrompt
  );
  const setConversation = useStoreActions(
    (actions: any) => actions?.conversationModel?.setConversation
  );
  const {data, isLoading} = useQuery<any>({
      queryKey: [conversationId],
      url: `${ApiUrl.GET_CHAT}/${conversationId}`,
      showToast: true,
    });
    useEffect(() => {
      if(data && !isLoading){
        const { _id, code, messages } = data;
        setPrompt({ code: code, loader: false });
        setConversation({conversationId:_id, messages:messages});
      }
    },[data,isLoading]);
  return (
    <>
        <div className="h-full bg-opacity-25 bg-purple-white-gradient-opactity25">
          <div>
            <OverviewMain />
          </div>
        </div>
    </>
  );
};

export default page;
