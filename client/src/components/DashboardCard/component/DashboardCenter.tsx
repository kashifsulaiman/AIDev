'use client';

import DashboardCards from '../DashboardCards';
import AiQuestions from './AiQuestions';
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
  return (
    <div className="Scroller-Class max-h-[350px] overflow-y-auto">
      {conversation?.conversationId ? (
        <AiQuestions />
      ) : (
        <DashboardCards data={Array.isArray(prompts) ? prompts : []} />
      )}
    </div>
  );
};

export default DashboardCenter;
