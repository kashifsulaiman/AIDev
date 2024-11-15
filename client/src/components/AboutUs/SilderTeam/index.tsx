import TestimonialsSlider from '@/common/slider/Slider';
import React from 'react';
import TeamCard from '../TeamCard';
const teamMembers = [
  {
    id: 1,
    content: (
      <TeamCard
        key={1}
        alt={'Jane Blake'}
        src={'asstes/images/JaneBlake.png'}
        name={'Jane Blake'}
        title={'Senior AI Developer Instructor'}
      />
    ),
  },
  {
    id: 2,
    content: (
      <TeamCard
        key={2}
        alt={'Maria Kelly'}
        src={'asstes/images/Maria-Kelly.png'}
        name={'Maria Kelly'}
        title={'AI Developer Instructor'}
      />
    ),
  },
  {
    id: 3,
    content: (
      <TeamCard
        key={3}
        alt={'William Doe'}
        src={'asstes/images/William-Doe.png'}
        name={'William Doe'}
        title={'Senior AI Developer'}
      />
    ),
  },
];

const TestmonialCards = () => {
  return (
    <div className="mx-4 flex max-w-[1300px] flex-wrap justify-center gap-7 lg:mx-auto lg:mb-[123px] min-[1560px]:max-w-[1620px]">
      <TestimonialsSlider data={teamMembers} showNavigation={false} />
    </div>
  );
};

export default TestmonialCards;
