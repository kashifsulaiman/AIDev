import TestimonialsSlider from '@/common/slider/Slider';
import { ExploreStudio, LowCode, Platform } from '@/components/SVG';
import React from 'react';
import Card from './Card';
const cardData = [
  {
    id: 1,
    content: (
      <Card
        icon={<Platform />}
        title={'Leading Platform for Low-Code AI'}
        description={
          'AI dev Studio Pro is a visual IDE that accelerates application development, automates routine work, and helps you handle complex tasks with ease.'
        }
        link={'#'}
      />
    ),
  },
  {
    id: 2,
    content: (
      <Card
        icon={<ExploreStudio />}
        title={'Explore Studio Pro'}
        description={
          'Leverage AI and low-code to deliver next-gen smart applications with Maia. Mendix is an AI-enhanced platform that makes it easier to develop and deliver enterprise applications.'
        }
        link={'#'}
      />
    ),
  },
  {
    id: 3,
    content: (
      <Card
        icon={<LowCode />}
        title={'Low-Code Governance'}
        description={
          'See how AI Dev low-code platform empowers enterprises with seamless IT governance and robust enterprise risk management for confident innovation and compliance.'
        }
        link={'#'}
      />
    ),
  },
];

const Cards = () => {
  return (
    <div className="2xl-px-4 mx-auto max-w-full px-4 pb-6 pt-10 md:max-w-3xl lg:max-w-[924px] lg:pb-10 lg:pt-20 xl:max-w-[1230px] min-[1640px]:max-w-[1620px] min-[1640px]:px-0">
      <div className="flex flex-wrap justify-between gap-4">
        <TestimonialsSlider data={cardData} showNavigation={false} />
      </div>
    </div>
  );
};

export default Cards;
