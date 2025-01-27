'use client';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import DashboardCard from './component/DashboardCard';
import { Icons } from '../SideBar';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Loader from '@/Loader/loading';
interface CardData {
  title: string;
  description: string;
  template: string;
}

interface DashboardCardsProps {
  data: CardData[];
}

const DashboardCards = ({ data }: DashboardCardsProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleCardClick = (description: string) => {
    const prompt = data.find((card) => card.description === description);
    if (prompt) {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set('promptType', prompt.template);
      const search = current.toString();
      const query = search ? `?${search}` : '';

      router.push(`${pathname}${query}`);
      setSelectedCard(description);
    }
  };

    const promptData = useStoreState((state: any) => state?.promptModel?.prompt);
    const clearPrompt = useStoreActions(
      (actions: any) => actions?.promptModel?.clearPrompt
    );
    const clearConversation = useStoreActions(
      (actions: any) => actions?.conversationModel?.clearConversation
    );
  
    useEffect(() => {
      clearPrompt();
      clearConversation();
    }, []);

  if (promptData.loader) return (
    <div className="mt-10 h-full flex size-full items-center justify-center">
        <div className="size-20">
          <Loader Color="#961CBE"  height='50px' width='50px'/>
        </div>
      </div>
  );

  return (
    <div>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.map((card, index) => {
          const Icon =
            Icons[card.template?.toUpperCase() as keyof typeof Icons] || null;

          return (
            <DashboardCard
              key={index}
              Icon={Icon}
              title={card.title}
              description={card.description}
              onClick={() => handleCardClick(card.description)}
              isSelected={selectedCard === card.description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DashboardCards;
