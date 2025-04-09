'use client';

import DashboardCards from '../DashboardCards';
import Messages from './Messages';
import { useStoreState } from 'easy-peasy';
import { StoreModel } from '@/redux/model';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useStoreActions } from 'easy-peasy';
import { base64Decode } from '@/utils/utils';
import React, { useEffect, useRef } from 'react';
import { showToaster } from '@/components/Toaster';
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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const encodedUser = searchParams.get('user');
  const user = encodedUser ? base64Decode(encodedUser) : null;

  const hasRun = useRef(false);

  const router = useRouter();
  const userAction = useStoreActions<StoreModel>(
    (actions) => actions.userObj.add
  );
  const conversation = useStoreState<StoreModel>(
    (state) => state?.conversationModel?.conversation
  );
  const selectedStrategy = useStoreState<StoreModel>(
    (state) => state.promptingStrategyModel.strategy
  );
  useEffect(() => {
    if (hasRun.current) return;
    if (user) {
      hasRun.current = true;
      userAction(user);
      if (pathname.endsWith('main')) {
        const current = new URLSearchParams(searchParams.toString());
        current.delete('user');
        router.push(`${pathname}${current.toString() ? `?${current}` : ''}`);
      }
      showToaster(`Google login successful. Welcome, ${user.name}!`, 'success');
    }
  }, [user]);
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
