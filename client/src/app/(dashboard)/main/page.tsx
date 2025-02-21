import TextArea from '@/components/DashboardCard/component/TextArea';
import DashboardCards from '@/components/DashboardCard/DashboardCards';
import { allPrompts } from '@/config/api.config';
import React from 'react';

const DashBoard = async ({ searchParams }: any) => {
  const prompts = await allPrompts();
  const { promptType } = searchParams;
  const selectedPrompt = prompts.find(
    (prompt: any) => prompt.template === promptType
  );
  return (
    <div>
      <div className="min-h-screen bg-purple-white-gradient-opactity25">
        <div className="mx-auto h-screen p-4 sm:max-w-2xl md:max-w-[1040px] xl:max-w-[1200px] 2xl:p-0">
          <div className="flex h-full flex-col justify-between overflow-y-hidden">
            <div className="Scroller-Class h-[calc(100vh-145px)] overflow-y-auto md:h-[calc(100vh-180px)]">
              <div className="pt-10 text-center">
                <h4 className="bg-gradient-to-r from-[#961CBE] to-[#0F47F6] bg-clip-text font-Jakarta text-2xl font-bold leading-none text-transparent md:text-[46px] lg:text-[80px]">
                  Hello!
                </h4>
                <p className="font-Jakarta text-[20px] font-medium text-blueTheme-950 md:text-3xl lg:text-6xl">
                  How can I help you today?
                </p>
              </div>
              <div>
                <DashboardCards data={Array.isArray(prompts) ? prompts : []} />
              </div>
            </div>
            <div>
              <TextArea prompt={selectedPrompt} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
