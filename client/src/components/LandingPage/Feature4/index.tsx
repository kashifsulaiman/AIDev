import TestimonialsSlider from '@/common/slider/Slider';
import Text from '@/common/text/Index';

import React from 'react';
import SingleCard from './SingleCard';

const plans = [
  {
    id: 1,
    content: (
      <SingleCard
        title={'Starter'}
        subTitle={'Free Month!'}
        price={{ original: '$249', current: '$0', perMonth: '/month¹' }}
        description={
          'For startups and SMBs looking to launch today and grow their subscription business fast.'
        }
        keyLabel={'Key features include'}
        buttonLabel={'Start free trial'}
        keyFeatures={[
          'Core AI Code Assistance',
          'Limited Integrations',
          'Community Support',
          'Single User License',
        ]}
        mostPopular={false}
      />
    ),
  },
  {
    id: 2,
    content: (
      <SingleCard
        title={'Professional'}
        subTitle={'Most Popular'}
        subtit={"Let's chat"}
        price={{ original: null, current: "Let's chat", perMonth: null }}
        description={
          'For midsize companies ready to scale and optimize recurring revenue operations.'
        }
        keyLabel={'All Popular features plus'}
        buttonLabel={'Start free trial'}
        keyFeatures={[
          'Advanced AI Insights',
          'Team Collaboration Tools',
          'Extended Integrations',
          'Up to 5 User Licenses',
        ]}
        mostPopular={true}
      />
    ),
  },
  {
    id: 3,
    content: (
      <SingleCard
        title={'Elite'}
        subTitle={'Full Access'}
        subtit={"Let's chat"}
        price={{ original: null, current: "Let's chat", perMonth: null }}
        description={
          'For enterprises with large payment volumes and diverse subscription offerings.'
        }
        keyLabel={'All Professional features plus'}
        buttonLabel={'Get started'}
        keyFeatures={[
          'Full AI Suite',
          'Enterprise Integrations',
          'Dedicated Account Manager',
          'Unlimited User Licenses',
        ]}
        mostPopular={false}
      />
    ),
  },
];

function Features4() {
  return (
    <div className="mx-auto max-w-full px-4 pb-6 pt-10 md:max-w-[630px] lg:max-w-[924px] lg:pb-10 lg:pt-20 xl:max-w-[1230px] min-[1640px]:max-w-[1620px] min-[1640px]:px-0">
      <div className="flex flex-col items-center justify-center">
        <h2 className="items-center text-center font-Jakarta text-3xl font-bold text-black sm:text-6xl">
          Choose The Right Plan For Your Needs
        </h2>
        <Text className="my-2 text-center font-Jakarta text-xl font-normal !text-black sm:text-2xl">
          Flexible Plans for Every Developer – Start Free
        </Text>
      </div>

      <div className="flex flex-col items-stretch justify-center gap-10 pt-20 sm:flex-row sm:justify-between lg:pt-10">
        <TestimonialsSlider data={plans} showNavigation={false} />
      </div>
    </div>
  );
}

export default Features4;
