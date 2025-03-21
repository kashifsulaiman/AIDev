'use client';

import DashboardCards from '../DashboardCards';
import Messages from './Messages';
import { useStoreState } from 'easy-peasy';
import { StoreModel } from '@/redux/model';
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
  const conversation = useStoreState<StoreModel>(
    (state) => state?.conversationModel?.conversation
  );
  const { strategy } = useStoreState<StoreModel>(
      (state) => state.promptingStrategyModel
    );
  return (
    <div className="Scroller-Class max-h-[350px] overflow-y-auto">
      {strategy.id === 'guided-prompting' && conversation?.conversationId ? (
        <Messages />
      ) : (
        <DashboardCards data={Array.isArray(prompts) ? prompts : []} />
      )}
    </div>
  );
};

export default DashboardCenter;
