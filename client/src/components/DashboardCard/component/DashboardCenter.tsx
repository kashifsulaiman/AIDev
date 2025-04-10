'use client';

import DashboardCards from '../DashboardCards';
import Messages from './Messages';
import { useStoreState } from 'easy-peasy';
import { StoreModel } from '@/redux/model';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
interface DashboardCenterProps {
  prompts: Prompts[];
}
interface Prompts {
  id: number;
  title: string;
  template: string;
  description: string;
  apiKey?: string;
  question?: string;
}
const DashboardCenter = ({ prompts }: DashboardCenterProps) => {
  useGoogleAuth()
  const conversation = useStoreState<StoreModel>(
    (state) => state?.conversationModel?.conversation
  );
  const selectedStrategy = useStoreState<StoreModel>(
    (state) => state.promptingStrategyModel.strategy
  );
  return (
    <div className="Scroller-Class max-h-[350px] overflow-y-auto">
      {conversation?.conversationId &&
      selectedStrategy.id === 'guided-prompting' ? (
        <Messages />
      ) : (
        <DashboardCards data={Array.isArray(prompts) ? prompts : []} />
      )}
    </div>
  );
};

export default DashboardCenter;
